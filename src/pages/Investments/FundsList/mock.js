export const columns = [
  {
    Header: 'FUNDO',
    accessor: 'fundo',
    width: '400px',
  },
  {
    Header: 'APLICAÇÃO MIN. (R$)',
    accessor: 'minimo_inicial',
    width: '110px',
  },
  {
    Header: 'RESGATE',
    width: '236px',
    columns: [
      {
        Header: 'COTIZAÇÃO',
        accessor: 'resgate_cotizacao',
        width: '118px',
      },
      {
        Header: 'LIQUIDAÇÃO',
        accessor: 'resgate_financeiro',
        width: '118px',
      },
    ],
  },
  {
    Header: 'TAXA ADM. (% a.a.)',
    accessor: 'taxa_administracao',
    width: '110px',
  },
  {
    Header: 'RENTABILIDADE (%)',
    width: '273px',
    columns: [
      {
        Header: 'MÊS',
        accessor: 'rentabil_fundo_mes',
        width: '91px',
      },
      {
        Header: 'ANO',
        accessor: 'rentabil_fundo_ano',
        width: '91px',
      },
      {
        Header: 'ÚLT. 12M',
        accessor: 'rentabil_fundo_12_meses',
        width: '91px',
      },
    ],
  },
  {
    Header: '',
    accessor: 'is_fundo_ativo',
    width: '120px',
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
    name: 'Multimercado',
    value: 'multimercado',
  },
  {
    name: 'Ações',
    value: 'ações',
  },
  {
    name: 'Investimento no Exterior',
    value: 'investimentoexterior',
  },
  {
    name: 'Cambial',
    value: 'cambial',
  },
]
