export const columns = [
  {
    Header: 'TÍTULO',
    dataTestId: 'th-title',
    accessor: 'fundo',
    justifyHeader: 'flex-start',
    styles: {
      width: 241,
      minWidth: 241,
      header: {
        width: 241,
      },
    },
  },
  {
    Header: 'APLIC. MIN.',
    dataTestId: 'th-min',
    accessor: 'minimo_inicial',
    justifyHeader: 'center',
    align: 'flex-end',
    styles: {
      width: 105,
      header: {
        width: 120,
      },
    },
  },
  {
    Header: 'RESGATE (COT.)',
    dataTestId: 'th-resgate',
    accessor: 'resgate_cotizacao',
    align: 'center',
    styles: {
      width: 130,
      header: {
        width: 140,
      },
    },
  },
  {
    Header: 'TAXA ADM. (a.a.)',
    dataTestId: 'th-taxa',
    accessor: 'taxa_administracao',
    align: 'center',
    styles: {
      width: 97,
      header: {
        width: 149,
      },
    },
  },
  {
    Header: 'RENT. MÊS',
    dataTestId: 'th-rent-mes',
    accessor: 'rentabil_fundo_mes',
    align: 'center',
    styles: {
      width: 97,
      header: {
        width: 107,
      },
    },
  },
  {
    Header: 'RENT. ANO',
    dataTestId: 'th-rent-ano',
    accessor: 'rentabil_fundo_ano',
    align: 'center',
    styles: {
      width: 99,
      header: {
        width: 109,
      },
    },
  },
  {
    Header: 'RENT. ÚLT. 12M',
    dataTestId: 'th-rent-12',
    accessor: 'rentabil_fundo_12_meses',
    align: 'center',
    styles: {
      width: 97,
      header: {
        width: 140,
      },
    },
  },
  {
    Header: '',
    dataTestId: '',
    align: 'center',
    accessor: 'is_fundo_ativo',
    styles: {
      width: 147,
      header: {
        width: 147,
      },
    },
  },
]
export const columnsWithSticky = [
  {
    Header: 'TÍTULO',
    accessor: 'fundo',
    width: '241px',
    widthHeader: '221px',
    justifyHeader: 'flex-start',
    sticky: 'left',
    align: 'flex-start',
    styles: {
      header: {
        width: 241,
        minWidth: 241,
      },
      width: 241,
      minWidth: 241,
    },
  },
  {
    Header: 'APLIC. MIN.',
    accessor: 'minimo_inicial',
    justifyHeader: 'flex-end',
    align: 'flex-end',
    styles: {
      header: {
        width: 130,
        minWidth: 130,
      },
      width: 130,
      minWidth: 130,
    },
  },
  {
    Header: 'RESGATE (COT.)',
    accessor: 'resgate_cotizacao',
    align: 'center',
    styles: {
      header: {
        width: 139,
        minWidth: 139,
      },
      width: 139,
      minWidth: 139,
    },
  },
  {
    Header: 'TAXA ADM. (a.a.)',
    accessor: 'taxa_administracao',
    align: 'center',
    styles: {
      header: {
        width: 139,
        minWidth: 139,
      },
      width: 139,
      minWidth: 139,
    },
  },
  {
    Header: 'RENT. MÊS',
    accessor: 'rentabil_fundo_mes',
    align: 'center',
    styles: {
      header: {
        width: 97,
        minWidth: 97,
      },
      width: 97,
      minWidth: 97,
    },
  },
  {
    Header: 'RENT. ANO',
    accessor: 'rentabil_fundo_ano',
    align: 'center',
    styles: {
      header: {
        width: 97,
        minWidth: 97,
      },
      width: 97,
      minWidth: 97,
    },
  },
  {
    Header: 'RENT. ÚLT. 12M',
    accessor: 'rentabil_fundo_12_meses',
    align: 'center',
    styles: {
      header: {
        width: 126,
        minWidth: 126,
      },
      width: 126,
      minWidth: 126,
    },
  },
  {
    Header: '',
    accessor: 'is_fundo_ativo',
    align: 'center',
    sticky: 'right',
    styles: {
      header: {
        width: 164,
        minWidth: 164,
      },
      width: 164,
      minWidth: 164,
    },
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
