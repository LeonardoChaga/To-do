import { Pipe, PipeTransform } from '@angular/core';
import { prioridadeTarefaEnum } from '../enum/prioridade-tarefa.enum';

@Pipe({
  name: 'tarefaPrioridade',
})
export class tarefaPrioridadePipe implements PipeTransform {
  transform(value: prioridadeTarefaEnum): string {
    switch (value) {
      case prioridadeTarefaEnum.BAIXA:
        return 'Baixa';
      case prioridadeTarefaEnum.MEDIA:
        return 'Média';
      case prioridadeTarefaEnum.ALTA:
        return 'Alta';
      case prioridadeTarefaEnum.URGENTE:
        return 'Urgente';
      default:
        return '';
    }
  }
}
