import {
  Component,
  HostListener,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { StorageService } from '../../../shared/services/storage.service';
import { Usuario } from '../../../modules/login/model/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { UserConfigurationsComponent } from './components/user-configurations.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent implements OnInit {
  public usuario?: Usuario;
  public configOpen: boolean = false;

  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(private _storageS: StorageService) {}

  ngOnInit(): void {
    this.usuario = this._storageS.getUsuarioInfo();
  }

  changeConfigState() {
    this.configOpen = !this.configOpen;
  }

  openConfigurations() {
    this.dialog.open(UserConfigurationsComponent, {
      data: { name: this.name() },
    });
  }
}
