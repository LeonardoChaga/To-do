import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private url: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  salvarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this._http.post<Tarefa>(`${this.url}/tarefa`, tarefa);
  }

  getTarefas(): Observable<Tarefa[]> {
    return this._http.get<Tarefa[]>(`${this.url}/tarefa`);
  }
}
