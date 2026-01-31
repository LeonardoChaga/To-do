import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-layout',
  templateUrl: './user-configurations.component.html',
  styleUrls: ['./user-configurations.component.scss'],
  standalone: false,
})
export class UserConfigurationsComponent {
  public form!: FormGroup;

  readonly dialogRef = inject(MatDialogRef<UserConfigurationsComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
