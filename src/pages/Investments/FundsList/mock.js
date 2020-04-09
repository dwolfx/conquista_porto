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
    accessor: 'resgate_cotizacao',
  },
  {
    Header: 'TAXA ADM. (% a.a.)',
    accessor: 'taxa_administracao',
    width: '110px',
  },
  {
    Header: 'RENTABILIDADE (%)',
    accessor: 'rentabilidade',
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

export const columns2 = [
  {
    Header: 'TÍTULO',
    accessor: 'fundo',
    width: '242px',
    widthHeader: '221px',
    justifyHeader: 'flex-start',
  },
  {
    Header: 'APLIC. MIN.',
    accessor: 'minimo_inicial',
    width: '105px',
    align: 'right',
  },
  {
    Header: 'RESGATE (COT.)',
    accessor: 'resgate_cotizacao',
    width: '130px',
    align: 'right',
  },
  {
    Header: 'TAXA ADM. (a.a.)',
    accessor: 'taxa_administracao',
    width: '139px',
  },
  {
    Header: 'RENT. MÊS',
    accessor: 'rentabil_fundo_mes',
    width: '97px',
  },
  {
    Header: 'RENT. ANO',
    accessor: 'rentabil_fundo_ano',
    width: '99px',
  },
  {
    Header: 'RENT. ÚLT. 12M',
    accessor: 'rentabil_fundo_12_meses',
    width: '131px',
  },
  {
    Header: '',
    accessor: 'is_fundo_ativo',
    width: '115px',
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
    value: 'rendavariável',
  },
  {
    name: 'Investimento no Exterior',
    value: 'investimentonoexterior',
  },
  {
    name: 'Cambial',
    value: 'cambial',
  },
]
