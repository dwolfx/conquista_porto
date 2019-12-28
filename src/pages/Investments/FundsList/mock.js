export const columns = [
  {
    Header: 'Fundo',
    accessor: 'fundo',
    width: '400px',
  },
  {
    Header: 'Aplicação min. (R$)',
    accessor: 'minimo_inicial',
    width: '110px',
  },
  {
    Header: 'Resgate',
    width: '240px',
    columns: [
      {
        Header: 'Cotização',
        accessor: 'resgate_cotizacao',
        width: '118px',
      },
      {
        Header: 'Liquidação',
        accessor: 'resgate_financeiro',
        width: '118px',
      },
    ],
  },
  {
    Header: 'Taxa Adm. (% A.A.)',
    accessor: 'taxa_administracao',
    width: '110px',
  },
  {
    Header: 'Rentabilidade',
    width: '225px',
    columns: [
      {
        Header: 'Mês',
        accessor: 'rentabil_fundo_mes',
        width: '73px',
      },
      {
        Header: 'Ano',
        accessor: 'rentabil_fundo_ano',
        width: '73px',
      },
      {
        Header: 'Últ. 12M',
        accessor: 'rentabil_fundo_12_meses',
        width: '73px',
      },
    ],
  },
  {
    Header: '',
    accessor: 'is_fundo_ativo',
    width: '115px',
  },
]

export const riskClassification = [
  {
    name: 'Todos os fundos',
    value: 'todos',
  },
  {
    name: 'Baixo',
    value: 1,
  },
  {
    name: 'Médio-Baixo',
    value: 2,
  },
  {
    name: 'Médio',
    value: 3,
  },
  {
    name: 'Médio-Alto',
    value: 4,
  },
  {
    name: 'Alto',
    value: 5,
  },
]

export const fundsType = [
  {
    name: 'Todos',
    value: 'todos',
  },
  {
    name: 'Renda Fixa',
    value: 'rendafixa',
  },
  {
    name: 'Renda Variável',
    value: 'rendavariavel',
  },
  {
    name: 'Multimercado',
    value: 'multimercado',
  },
  {
    name: 'Ações',
    value: 'acoes',
  },
  {
    name: 'Cambial',
    value: 'cambial',
  },
]
