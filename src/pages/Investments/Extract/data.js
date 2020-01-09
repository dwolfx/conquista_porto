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
  {
    Header: 'Data de Efetivação',
    accessor: 'effectuationDate',
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
    name: 'Últimos 90 dias',
    value: 90,
  },
  {
    name: 'Período específico',
    value: 'other',
  },
]
