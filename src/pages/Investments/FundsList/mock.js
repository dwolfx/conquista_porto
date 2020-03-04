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
    width: '236px',
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
    Header: 'Taxa Adm. (% a.a.)',
    accessor: 'taxa_administracao',
    width: '110px',
  },
  {
    Header: 'Rentabilidade (%)',
    width: '273px',
    columns: [
      {
        Header: 'Mês',
        accessor: 'rentabil_fundo_mes',
        width: '91px',
      },
      {
        Header: 'Ano',
        accessor: 'rentabil_fundo_ano',
        width: '91px',
      },
      {
        Header: 'Últ. 12M',
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
