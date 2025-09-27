import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Login } from './model/login.model';
import { Auth } from '../../core/models/auth.model';
import { USER_STORAGE } from '../../shared/constants/constants.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _loginS: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group(new Login());
  }

  login() {
    if (this.form.valid) {
      this._loginS.login(this.form.value).subscribe({
        next: (res: Auth) => {
          sessionStorage.setItem(USER_STORAGE, JSON.stringify(res));

          this._router.navigate(['/kanban']);
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err);
        },
      });
    }
    this.form.markAllAsTouched();
  }
}
