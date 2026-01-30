import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Auth } from '../../../core/models/auth.model';
import { StorageService } from '../../../shared/services/storage.service';
import { Login } from '../model/login.model';
import { USER_STORAGE } from '../../../shared/constants/constants.constant';
import { Observable, of, switchMap } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _storageS: StorageService,
    private _router: Router,
  ) {}

  login = (obj: Login) =>
    this._http.post<Auth>(`${this.url}/usuario/login`, obj);

  createAccount = (obj: Usuario) =>
    this._http.post<Usuario>(`${this.url}/usuario/cadastrar`, obj);

  getAccessToken(): Observable<Auth> {
    return this._http
      .post<Auth>(
        'usuario/update-token',
        this._storageS.getUsuarioInfo().refreshToken,
      )
      .pipe(
        switchMap((res) => {
          sessionStorage.setItem(USER_STORAGE, JSON.stringify(res));
          return of(res);
        }),
      );
  }

  logout() {
    this._storageS.deleteUsuarioInfoStorage();
    this._router.navigateByUrl('/login');
  }
}
