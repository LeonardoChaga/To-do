import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared/services/storage.service';
import { Usuario } from '../../../modules/login/model/usuario.model';
import { UserConfigurationsComponent } from './components/user-configuration-dialog/user-configurations.component';
import { LoginService } from '../../../modules/login/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent implements OnInit, OnDestroy {
  public usuario?: Usuario;
  public configOpen = false;

  private readonly _subs = new Subscription();
  readonly dialog = inject(MatDialog);

  constructor(
    private readonly _storageS: StorageService,
    private _loginS: LoginService,
  ) {}

  ngOnInit(): void {
    this._subs.add(
      this._storageS.user$.subscribe((u: Usuario) => (this.usuario = u)),
    );
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  changeConfigState(): void {
    this.configOpen = !this.configOpen;
  }

  openConfigurations(): void {
    this.configOpen = false;

    this.dialog.open(UserConfigurationsComponent, {
      data: this.usuario,
    });
  }

  logOut() {
    this._loginS.logout();
  }
}
