import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { prioridadeTarefaEnum } from '../enum/prioridade-tarefa.enum';
import { tarefaStatusEnum } from '../enum/tarefa-status.enum';

@JsonObject()
export class Tarefa {
  constructor(init?: Partial<Tarefa>) {
    Object.assign(this, init);
  }

  @JsonProperty()
  id?: string = undefined;

  @JsonProperty()
  titulo?: string = undefined;

  @JsonProperty()
  descricao?: string = undefined;

  @JsonProperty()
  prioridade: prioridadeTarefaEnum = prioridadeTarefaEnum.BAIXA;

  @JsonProperty()
  status?: tarefaStatusEnum = undefined;

  @JsonProperty()
  prazo?: Date = undefined;

  @JsonProperty()
  dataHoraCriacao?: Date = undefined;

  @JsonProperty()
  dataHoraModificacao?: Date = undefined;

  @JsonProperty()
  usuarioCriacao?: string = undefined;
}
