import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../core/layout/layout.module';
import { KanbanComponent } from './kanban.component';
import { KanbanRoutingModule } from './kanban.routing';

@NgModule({
  declarations: [KanbanComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KanbanRoutingModule,
    LayoutModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutModule
  ],
  exports: [KanbanComponent],
})
export class KanbanModule {}
