import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, inject, model, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa.component';
import { prioridadeTarefaEnum } from './enum/prioridade-tarefa.enum';
import {
  COMBO_TAREFA_STATUS,
  tarefaStatusEnum,
} from './enum/tarefa-status.enum';
import { KanbanColumn } from './interface/kanban-column.interface';
import { Tarefa } from './models/tarefa.model';
import { TarefaService } from './services/tarefa.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  standalone: false,
})
export class KanbanComponent implements OnInit {
  public tarefas: Tarefa[] = [];
  public tarefaStatusEnum = tarefaStatusEnum;
  public comboTarefaStatus = COMBO_TAREFA_STATUS;
  public kanbanData: KanbanColumn[] = [];

  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(private _tarefaS: TarefaService) {}

  ngOnInit(): void {
    this._getTasks();
  }

  openForm(): void {
    const dialogRef = this.dialog.open(FormTarefaComponent, {
      data: { name: this.name() },
    });

    dialogRef.afterClosed().subscribe(() => {
      this._getTasks();
    });
  }

  editTask(tarefa: Tarefa) {
    const dialogRef = this.dialog.open(FormTarefaComponent, {
      data: { tarefa },
    });

    dialogRef.afterClosed().subscribe(() => {
      this._getTasks();
    });
  }

  drop(event: CdkDragDrop<any[]>, novoStatus: number) {
    const prevContainer = event.previousContainer;
    const currContainer = event.container;

    if (prevContainer === currContainer) {
      moveItemInArray(
        currContainer.data,
        event.previousIndex,
        event.currentIndex,
      );

      const tasks = currContainer.data.map((t, index) => ({
        ...t,
        status: novoStatus,
        ordem: index,
      }));
      this._tarefaS.alterarOrdemTarefa(tasks).subscribe();
    } else {
      const movedTask = prevContainer.data[event.previousIndex];
      movedTask.status = novoStatus;

      transferArrayItem(
        prevContainer.data,
        currContainer.data,
        event.previousIndex,
        event.currentIndex,
      );

      this._tarefaS.alterarStatusTarefa(movedTask).subscribe();

      const tasksDestino = currContainer.data.map((t, index) => ({
        ...t,
        ordem: index,
      }));
      this._tarefaS.alterarOrdemTarefa(tasksDestino).subscribe();
    }
  }

  getTarefaByStatus(status: tarefaStatusEnum) {
    return this.tarefas.filter((d) => d.status == status);
  }

  getPrioridadeColor(prioridade: prioridadeTarefaEnum): string {
    switch (prioridade) {
      case prioridadeTarefaEnum.BAIXA:
        return '#6DA34D';
      case prioridadeTarefaEnum.MEDIA:
        return '#FFB300';
      case prioridadeTarefaEnum.ALTA:
        return '#F06449';
      case prioridadeTarefaEnum.URGENTE:
        return '#BD1E1E';
      default:
        return '#9e9e9e';
    }
  }

  private _getTasks() {
    this._tarefaS.getTarefas().subscribe({
      next: (res) => {
        this.tarefas = res;
        this.organizarColunas();
      },
    });
  }

  organizarColunas() {
    this.kanbanData = this.comboTarefaStatus.map((coluna) => {
      return {
        ...coluna,

        tarefas: this.tarefas
          .filter((t) => t.status === coluna.id)
          .sort((a, b) => (a.ordem || 0) - (b.ordem || 0)),
      };
    });
  }

  get dropLists(): string[] {
    return this.comboTarefaStatus.map((s) => 'dropList' + s.id);
  }
}
