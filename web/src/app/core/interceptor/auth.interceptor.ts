import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { StorageService } from '../../shared/services/storage.service';
import { LoginService } from '../../modules/login/services/login.service';

let refreshTokenInProgress = false;
const tokenSubject = new BehaviorSubject<string | null>(null);

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (req.headers.has('InterceptorSkipHeader')) {
    return next(
      req.clone({ headers: req.headers.delete('InterceptorSkipHeader') }),
    );
  }

  let updatedReq = req;
  const accessToken = storageService.getUsuarioInfo()?.accessToken;

  if (req.method !== 'JSONP' && accessToken) {
    updatedReq = setRequestAccessToken(req, accessToken);
  }

  return next(updatedReq).pipe(
    catchError((error: unknown) => {
      const httpErr = error as HttpErrorResponse;
      if (httpErr?.status === 401) {
        return handle401Error(req, next, storageService, loginService, router);
      }
      return throwError(() => error);
    }),
  );
};

function handle401Error(
  req: any,
  next: any,
  storageService: StorageService,
  loginService: LoginService,
  router: Router,
): Observable<any> {
  if (!refreshTokenInProgress) {
    refreshTokenInProgress = true;
    tokenSubject.next(null);

    return loginService.getAccessToken().pipe(
      switchMap((res: any) => {
        if (res?.accessToken) storageService.patchUsuarioInfo(res);

        const newToken = storageService.getUsuarioInfo()?.accessToken;
        if (!newToken) {
          handleTokenRefreshError(storageService, router);
          return throwError(() => new Error('Token refresh retornou vazio'));
        }

        tokenSubject.next(newToken);
        return next(setRequestAccessToken(req, newToken));
      }),
      catchError((err) => {
        handleTokenRefreshError(storageService, router);
        return throwError(() => err);
      }),
      finalize(() => (refreshTokenInProgress = false)),
    );
  }

  return tokenSubject.pipe(
    filter((t): t is string => !!t),
    take(1),
    switchMap((t) => next(setRequestAccessToken(req, t))),
  );
}

function setRequestAccessToken(req: any, accessToken: string): any {
  if (!req.url.includes('/usuario/update-token')) {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return req;
}

function handleTokenRefreshError(
  storageService: StorageService,
  router: Router,
): void {
  storageService.deleteUsuarioInfoStorage();
  router.navigateByUrl('/login');
}
