import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../core/layout/layout.module';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa.component';
import { KanbanComponent } from './kanban.component';
import { KanbanRoutingModule } from './kanban.routing';
import { tarefaPrioridadePipe } from './pipe/tarefa-prioridade.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

@NgModule({
  declarations: [KanbanComponent, FormTarefaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KanbanRoutingModule,
    LayoutModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    DragDropModule,
    tarefaPrioridadePipe,
    MatDividerModule,
    TruncatePipe,
  ],
  exports: [KanbanComponent, FormTarefaComponent],
})
export class KanbanModule {}
