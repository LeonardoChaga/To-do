import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../../../../modules/login/model/usuario.model';
import { LoginService } from '../../../../../modules/login/services/login.service';
import { StorageService } from '../../../../../shared/services/storage.service';
import { take } from 'rxjs';
import { SwalAlertService } from '../../../../../shared/services/swal.service';

@Component({
  selector: 'app-layout',
  templateUrl: './user-configurations.component.html',
  styleUrls: ['./user-configurations.component.scss'],
  standalone: false,
})
export class UserConfigurationsComponent implements OnInit {
  public form!: FormGroup;

  readonly dialogRef = inject(MatDialogRef<UserConfigurationsComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(
    private _fb: FormBuilder,
    private _loginS: LoginService,
    private _storageS: StorageService,
    private _swalS: SwalAlertService,
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group(new Usuario());

    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  editUser(): void {
    this._loginS
      .editUser(this.form.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.refreshUserAndPatchStorage();
          this.closeDialog();
        },
      });
  }

  private refreshUserAndPatchStorage(): void {
    const id = this.form.get('id')?.value;
    if (!id) return;

    this._loginS
      .getUserById(id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this._swalS.basicAlert(
            'Sucesso!',
            'Registro atualizado com sucesso!',
            'info',
          );
          this._storageS.patchUsuarioInfo(res);
        },
      });
  }
}
