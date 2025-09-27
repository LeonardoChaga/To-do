import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa.component';
import { TarefaService } from './services/tarefa.service';
import { Tarefa } from './models/tarefa.model';
import {
  COMBO_TAREFA_STATUS,
  tarefaStatusEnum,
} from './enum/tarefa-status.enum';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { prioridadeTarefaEnum } from './enum/prioridade-tarefa.enum';

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

    dialogRef.afterClosed().subscribe((result) => {
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
        event.currentIndex
      );
    } else {
      const movedTask = prevContainer.data[event.previousIndex];
      movedTask.status = novoStatus;

      transferArrayItem(
        prevContainer.data,
        currContainer.data,
        event.previousIndex,
        event.currentIndex
      );
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
    this._tarefaS
      .getTarefas()
      .subscribe({ next: (res) => (this.tarefas = res) });
  }

  get dropLists(): string[] {
    return this.comboTarefaStatus.map((s) => 'dropList' + s.id);
  }
}
