import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanComponent implements OnInit {
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    console.log();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormTarefaComponent, {
      data: { name: this.name() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog fechado');
    });
  }
}
