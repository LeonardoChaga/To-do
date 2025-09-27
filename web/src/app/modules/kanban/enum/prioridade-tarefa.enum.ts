export enum prioridadeTarefaEnum {
  BAIXA,
  MEDIA,
  ALTA,
  URGENTE,
}

export const COMBO_PRIORIDADE_TAREFA = [
  { id: prioridadeTarefaEnum.BAIXA, descricao: 'Baixa' },
  { id: prioridadeTarefaEnum.MEDIA, descricao: 'Média' },
  { id: prioridadeTarefaEnum.ALTA, descricao: 'Alta' },
  { id: prioridadeTarefaEnum.URGENTE, descricao: 'Urgente' },
];
