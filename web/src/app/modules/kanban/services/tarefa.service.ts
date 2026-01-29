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

  editarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this._http.put<Tarefa>(`${this.url}/tarefa`, tarefa);
  }

  removerTarefa(tarefa: string): Observable<string> {
    return this._http.delete<string>(`${this.url}/tarefa/${tarefa}`);
  }

  getTarefas(): Observable<Tarefa[]> {
    return this._http.get<Tarefa[]>(`${this.url}/tarefa`);
  }

  alterarStatusTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this._http.post<Tarefa>(`${this.url}/tarefa/alterar-status`, tarefa);
  }

  alterarOrdemTarefa(tarefa: Tarefa[]): Observable<Tarefa[]> {
    return this._http.post<Tarefa[]>(
      `${this.url}/tarefa/alterar-ordem`,
      tarefa,
    );
  }
}
