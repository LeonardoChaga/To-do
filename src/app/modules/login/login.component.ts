import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Login } from './model/login.model';
import { Auth } from '../../core/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  constructor(private _fb: FormBuilder, private _loginS: LoginService) {}

  ngOnInit(): void {
    this.form = this._fb.group(new Login());
  }

  login() {
    if (this.form.valid) {
      this._loginS.login(this.form.value).subscribe((res: Auth) => {
        console.log('usuario logado com sucesso', res);
      });
    }
    this.form.markAllAsTouched();
  }
}
