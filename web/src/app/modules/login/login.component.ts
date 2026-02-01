import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Login } from './model/login.model';
import { Auth } from '../../core/models/auth.model';
import { Usuario } from './model/usuario.model';
import { FormModeEnum } from './enum/home-form-mode.enum';
import { SwalAlertService } from '../../shared/services/swal.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('modeSwap', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate(
          '220ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;
  public formAccountCreation!: FormGroup;
  public formMode: FormModeEnum = FormModeEnum.LOGIN;
  public formModeEnum = FormModeEnum;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _loginS: LoginService,
    private readonly _router: Router,
    private readonly _swalS: SwalAlertService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _storageS: StorageService,
  ) {}

  ngOnInit(): void {
    this.formLogin = this._fb.group(new Login());
    this.formAccountCreation = this._fb.group(new Usuario());
  }

  login(): void {
    if (!this.formLogin.valid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this._loginS.login(this.formLogin.value).subscribe({
      next: (res: Auth) => {
        this._storageS.salvarUsuarioInfoStorage(res);
        this._router.navigate(['/kanban']);
      },
      error: (err) => {
        this._swalS.basicAlert(
          'Aviso',
          err?.error?.message ?? 'Erro',
          'warning',
        );
      },
    });
  }

  createAccount(): void {
    if (!this.formAccountCreation.valid) {
      this.formAccountCreation.markAllAsTouched();
      return;
    }

    this._loginS.createAccount(this.formAccountCreation.value).subscribe({
      next: () => {
        this._swalS
          .basicAlert('Sucesso!', 'Usuário salvo com sucesso!', 'info')
          .then((res) => {
            if (res) {
              this.formMode = FormModeEnum.LOGIN;
              this._cdr.detectChanges();
            }
          });
      },
      error: (err) => {
        this._swalS.basicAlert(
          'Aviso',
          err?.error?.message ?? 'Erro',
          'warning',
        );
      },
    });
  }

  changeFormMode(): void {
    this.formMode =
      this.formMode === FormModeEnum.LOGIN
        ? FormModeEnum.CREATE_ACCOUNT
        : FormModeEnum.LOGIN;
  }
}
