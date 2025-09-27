import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, from, of } from 'rxjs';
import {
  catchError,
  switchMap,
  filter,
  take,
  delay,
  mergeMap,
  retryWhen,
  finalize,
} from 'rxjs/operators';
import { StorageService } from '../../shared/services/storage.service';
import { LoginService } from '../../modules/login/services/login.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const loginService = inject(LoginService);
  const router = inject(Router);

  let refreshTokenInProgress = false;
  let tokenSubject = new BehaviorSubject<string | null>(null);

  if (req.headers.has('InterceptorSkipHeader')) {
    return next(
      req.clone({ headers: req.headers.delete('InterceptorSkipHeader') })
    );
  }

  let updatedReq = req.clone();
  if (req.method !== 'JSONP' && storageService.getUsuarioInfo()) {
    updatedReq = setRequestAccessToken(updatedReq, storageService);
  }

  return next(updatedReq).pipe(
    retryWhen((errors: Observable<any>) =>
      errors.pipe(
        mergeMap((error: any, retryCount: number) => {
          if (
            retryCount >= 2 ||
            (error instanceof Response && ![504, 502, 0].includes(error.status))
          ) {
            return throwError(() => error);
          }
          return of(error).pipe(delay(1000));
        })
      )
    ),
    catchError((error: any) => {
      if (error.status === 401) {
        return handle401Error(
          req,
          next,
          storageService,
          loginService,
          router,
          refreshTokenInProgress,
          tokenSubject
        );
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(
  req: any,
  next: any,
  storageService: StorageService,
  loginService: LoginService,
  router: Router,
  refreshTokenInProgress: boolean,
  tokenSubject: BehaviorSubject<string | null>
): Observable<any> {
  if (!refreshTokenInProgress) {
    refreshTokenInProgress = true;
    tokenSubject.next(null);

    const accessToken = storageService.getUsuarioInfo()?.accessToken || null;

    return from(loginService.getAccessToken()).pipe(
      switchMap(() => {
        tokenSubject.next(accessToken);
        const newReq = setRequestAccessToken(req, storageService);
        return next(newReq);
      }),
      catchError((error) => {
        handleTokenRefreshError(router);
        return throwError(() => error);
      }),
      finalize(() => (refreshTokenInProgress = false))
    );
  } else {
    return tokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap(() => next(setRequestAccessToken(req, storageService)))
    );
  }
}

function setRequestAccessToken(req: any, storageService: StorageService): any {
  if (!req.url.includes('/usuario/update-token')) {
    const accessToken = storageService.getUsuarioInfo()?.accessToken;
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return req;
}

function handleTokenRefreshError(router: Router) {
  router.navigateByUrl('/login');
}
