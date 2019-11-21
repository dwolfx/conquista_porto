export const statementColumns = [
  {
    Header: 'Data',
    accessor: 'date',
  },
  {
    Header: 'Transação',
    accessor: 'description',
  },
  {
    Header: 'Pontos',
    accessor: 'points',
  },
  {
    Header: 'Tipo',
    accessor: 'type',
  },
]

export const statementData = [
  {
    date: '31/05/2019',
    description: 'Produto',
    points: '100',
    type: 'Previdência',
  },
  {
    date: '31/05/2019',
    description: 'Produto',
    points: '468',
    type: 'Fundo de Investimento',
  },
  {
    date: '14/05/2019',
    description: 'Produto',
    points: '300',
    type: 'Seguro Vida',
  },
  {
    date: '28/06/2019',
    description: 'Produto',
    points: '473',
    type: 'Fundo de Investimento',
  },
  {
    date: '31/05/2019',
    description: 'Produto',
    points: '101',
    type: 'Previdência',
  },
  {
    date: '31/07/2019',
    description: 'Produto',
    points: '478',
    type: 'Fundo de Investimento',
  },
  {
    date: '31/07/2019',
    description: 'Produto',
    points: '102',
    type: 'Previdência',
  },
]

export const accumulatorData = []

export const accumulatorColumns = [
  {
    Header: 'Proposta',
    accessor: 'propose',
  },
  {
    Header: 'Nome',
    accessor: 'name',
  },
  {
    Header: 'Produto',
    accessor: 'product',
  },
  {
    Header: 'Susep',
    accessor: 'susep',
  },
  {
    Header: 'Recebida em',
    accessor: 'receicedDate',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
]

export default {
  statementColumns,
  statementData,
  accumulatorData,
  accumulatorColumns,
}
