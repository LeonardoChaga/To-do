import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { LoginService } from '../../modules/login/services/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _login: LoginService,
    private readonly _storage: StorageService,
    private readonly _router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    const { accessToken } = this._storage.getUsuarioInfo() ?? {};

    if (!accessToken) {
      this._login.logout();
      return this._router.createUrlTree(['/login']);
    }

    return true;
  }
}
