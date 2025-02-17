import { Injectable } from '@angular/core';
import { Router } from 'express';
import { Login } from '../model/login.model';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../core/models/auth.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = environment.apiUrl; 

  constructor(private _http: HttpClient) {}

  login = (obj: Login) =>
    this._http.post<Auth>(`${this.url}/usuario/login`, obj);
}
