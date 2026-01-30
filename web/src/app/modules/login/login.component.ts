import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Login } from './model/login.model';
import { Auth } from '../../core/models/auth.model';
import { USER_STORAGE } from '../../shared/constants/constants.constant';
import { Router } from '@angular/router';
import { Usuario } from './model/usuario.model';
import { FormModeEnum } from './enum/home-form-mode.enum';
import { SwalAlertService } from '../../shared/services/swal.service';
import { trigger, transition, style, animate } from '@angular/animations';

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
    private _fb: FormBuilder,
    private _loginS: LoginService,
    private _router: Router,
    private _swalS: SwalAlertService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.formLogin = this._fb.group(new Login());
    this.formAccountCreation = this._fb.group(new Usuario());
  }

  login() {
    if (this.formLogin.valid) {
      this._loginS.login(this.formLogin.value).subscribe({
        next: (res: Auth) => {
          sessionStorage.setItem(USER_STORAGE, JSON.stringify(res));

          this._router.navigate(['/kanban']);
        },
        error: (err) => {
          this._swalS.basicAlert('Aviso', err.error.message, 'warning');
        },
      });
    }
    this.formLogin.markAllAsTouched();
  }

  createAccount() {
    if (this.formAccountCreation.valid) {
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
          this._swalS.basicAlert('Aviso', err.error.message, 'warning');
        },
      });
    }
    this.formAccountCreation.markAllAsTouched();
  }

  changeFormMode() {
    if (this.formMode == FormModeEnum.LOGIN) {
      this.formMode = FormModeEnum.CREATE_ACCOUNT;
    } else {
      this.formMode = FormModeEnum.LOGIN;
    }
  }
}
