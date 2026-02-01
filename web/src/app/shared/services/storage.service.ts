import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../core/models/auth.model';
import { USER_STORAGE } from '../constants/constants.constant';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly _userSubject = new BehaviorSubject<Auth>(
    this.readFromStorage(),
  );
  readonly user$: Observable<Auth> = this._userSubject.asObservable();

  salvarUsuarioInfoStorage(obj: Auth): void {
    sessionStorage.setItem(USER_STORAGE, JSON.stringify(obj ?? {}));
    this._userSubject.next(obj ?? {});
  }

  getUsuarioInfo(): Auth {
    return this._userSubject.value;
  }

  deleteUsuarioInfoStorage(): void {
    sessionStorage.removeItem(USER_STORAGE);
    this._userSubject.next({});
  }

  patchUsuarioInfo(patch: Partial<Auth>): Auth {
    const current = this._userSubject.value ?? {};

    const merged: Auth = {
      ...current,
      ...patch,
      accessToken: (patch)?.accessToken ?? current?.accessToken,
      refreshToken: patch?.refreshToken ?? current?.refreshToken,
    };

    this.salvarUsuarioInfoStorage(merged);
    return merged;
  }

  private readFromStorage(): Auth {
    const raw = sessionStorage.getItem(USER_STORAGE);
    return raw ? (JSON.parse(raw) as Auth) : ({} as Auth);
  }
}
