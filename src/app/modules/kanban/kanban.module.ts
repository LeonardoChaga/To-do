import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../core/layout/layout.module';
import { KanbanComponent } from './kanban.component';
import { KanbanRoutingModule } from './kanban.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
  ],
  exports: [KanbanComponent, FormTarefaComponent],
})
export class KanbanModule {}
