export enum tarefaStatusEnum {
  A_FAZER,
  EM_ANDAMENTO,
  EM_REVISAO,
  FINALIZADA,
  ARQUIVADO,
}

export const COMBO_TAREFA_STATUS = [
  { id: tarefaStatusEnum.A_FAZER, descricao: 'A fazer' },
  { id: tarefaStatusEnum.EM_ANDAMENTO, descricao: 'Em andamento' },
  { id: tarefaStatusEnum.EM_REVISAO, descricao: 'Em revisão' },
  { id: tarefaStatusEnum.FINALIZADA, descricao: 'Finalizada' },
  { id: tarefaStatusEnum.ARQUIVADO, descricao: 'Arquivado' },
];
