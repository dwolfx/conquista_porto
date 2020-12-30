export const INTERVAL_SELECT_OPTIONS = {
  WEEK_INTERVAL_SELECT_OPTION: {
    id: 1,
    name: 'Últimos 7 dias',
    value: 7,
  },
  MONTH_INTERVAL_SELECT_OPTION: {
    id: 2,
    name: 'Últimos 30 dias',
    value: 30,
  },
  SPECIFIC_INTERVAL_SELECT_OPTION: {
    id: 3,
    name: 'Período específico',
    value: null,
  },
}

export const ALLOCATION_TYPES = {
  GOAL_LINK: { id: 1, name: 'Vinculo ao Objetivo' },
  GOAL_UNLINK: { id: 2, name: 'Desvinculo do objetivo' },
  GOAL_TRANSFER: { id: 3, name: 'Transferência entre objetivos' },
  INVEST: { id: 4, name: 'Aplicação no fundo' },
  REDEEM: { id: 5, name: 'Resgate do fundo' },
}
