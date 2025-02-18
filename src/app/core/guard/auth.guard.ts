import { Injectable } from '@angular/core';

import { StorageService } from '../../shared/services/storage.service';
import { LoginService } from '../../modules/login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private _login: LoginService, private _storage: StorageService) {}

  public canActivate(): boolean {
    if (!this._storage.getUsuarioInfo()) {
      this._login.logout();
      return false;
    }

    return true;
  }
}
