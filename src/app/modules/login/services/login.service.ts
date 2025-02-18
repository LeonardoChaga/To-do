import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Auth } from '../../../core/models/auth.model';
import { StorageService } from '../../../shared/services/storage.service';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _storageS: StorageService,
    private _router: Router
  ) {}

  login = (obj: Login) =>
    this._http.post<Auth>(`${this.url}/usuario/login`, obj);

  logout() {
    this._storageS.deleteUsuarioInfoStorage();
    this._router.navigateByUrl('login');
  }
}
