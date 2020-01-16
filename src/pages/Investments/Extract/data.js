export const statementColumns = [
  {
    Header: 'Data da Transação',
    accessor: 'transactionDate',
  },
  {
    Header: 'Tipo',
    accessor: 'type',
  },
  {
    Header: 'Valor',
    accessor: 'value',
  },
]

export const selectOptions = [
  {
    name: 'Últimos 7 dias',
    value: 7,
  },
  {
    name: 'Últimos 30 dias',
    value: 30,
  },
  {
    name: 'Últimos 60 dias',
    value: 60,
  },
  {
    name: 'Período específico',
    value: 'other',
  },
]
