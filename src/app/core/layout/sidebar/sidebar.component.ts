import { Component, inject, OnInit, signal } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { StorageService } from '../../../shared/services/storage.service';
import { Usuario } from '../../../modules/login/model/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent implements OnInit {
  public usuario?: Usuario;

  constructor(private _storageS: StorageService) {}

  ngOnInit(): void {
    this.usuario = this._storageS.getUsuarioInfo();
  }
}
