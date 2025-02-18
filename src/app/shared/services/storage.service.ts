import { Injectable } from '@angular/core';
import { Auth } from '../../core/models/auth.model';
import { USER_STORAGE } from '../constants/constants.constant';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  salvarUsuarioInfoStorage = (obj: Auth) =>
    sessionStorage.setItem(USER_STORAGE, JSON.stringify(obj));

  getUsuarioInfo = (): Auth | null => {
    const user = sessionStorage.getItem(USER_STORAGE);
    return user ? JSON.parse(user) : null;
  };

  deleteUsuarioInfoStorage = () => sessionStorage.removeItem(USER_STORAGE);

}
