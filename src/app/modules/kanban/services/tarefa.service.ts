import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Auth } from '../../../core/models/auth.model';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private url: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  salvarTarefa = (tarefa: Tarefa) =>
    this._http.post<Auth>(`${this.url}/tarefa`, tarefa);
}
