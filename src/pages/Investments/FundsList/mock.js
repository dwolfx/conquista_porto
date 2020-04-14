export const columns = [
  {
    Header: 'TÍTULO',
    accessor: 'fundo',
    width: '241px',
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
    width: '130px',
  },
  {
    Header: '',
    accessor: 'is_fundo_ativo',
    width: '114px',
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
