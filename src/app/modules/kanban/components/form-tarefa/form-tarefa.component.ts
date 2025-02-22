import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from '../../models/tarefa.model';
import { COMBO_PRIORIDADE_TAREFA } from '../../enum/prioridade-tarefa.enum';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-form-tarefa',
  templateUrl: './form-tarefa.component.html',
  styleUrls: ['./form-tarefa.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTarefaComponent implements OnInit {
  public form!: FormGroup;
  public comboPrioridade = COMBO_PRIORIDADE_TAREFA;

  readonly dialogRef = inject(MatDialogRef<FormTarefaComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private _fb: FormBuilder, private _TarefaS: TarefaService) {}

  ngOnInit(): void {
    this.form = this._fb.group(new Tarefa());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  salvar() {
    this._TarefaS.salvarTarefa(this.form.value).subscribe((res) => res);
  }
}
