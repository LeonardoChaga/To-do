import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../core/layout/layout.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    LayoutModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
