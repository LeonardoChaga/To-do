import { Tarefa } from '../models/tarefa.model';

export interface KanbanColumn {
  id: number;
  descricao: string;
  tarefas: Tarefa[];
}
