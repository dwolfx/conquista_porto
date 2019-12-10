export const funds = [
  {
    fundo: {
      name: 'Porto Seguro Soberano Referenciado DI Renda Fixa',
      img:
        'http://review.parati.ag/arena/conquista/assets/images/9.1/logo-temp.png',
      risco: 1,
    },
    aplicacaoMinima: '1.000.000,22',
    cotizacao: 'D+40',
    liquidacao: 'D+40',
    taxaAdm: '0,70',
    mes: '0,52%',
    ano: '1,64%',
    ult12meses: '7,11%',
    enabled: true,
    aplicacao: '20000.00',
    movimentacaoMin: '20000.00',
    saldoMin: '20000.00',
    horarioLimiteAplic: '20:00',
    tipo: {
      label: 'Renda fixa',
      valor: 'rendaFixa',
    },
    cnpj: '00.000.000/0000-00',
    gestor: 'LOREM IPSUM',
    plAtual: '00000000.00',
    plMedio12m: '00000000.00',
    dtInicio: '00/00/0000',
    benchmark: 'CDI',
    taxaPerformance: '20% SOBRE O QUE EXCEDER',
  },
  {
    fundo: {
      name: 'Capitânia Top Crédito Privado FIC FIRF',
      img:
        'http://review.parati.ag/arena/conquista/assets/images/9.1/logo-temp2.png',
      risco: 1,
    },
    aplicacaoMinima: '5.000,33',
    cotizacao: 'D+1',
    liquidacao: 'D+1',
    taxaAdm: '0,50',
    mes: '0,37%',
    ano: '1,23%',
    ult12meses: '5,12%',
    enabled: true,
    tipo: {
      label: 'Multimercado',
      valor: 'multimercado',
    },
    aplicacao: '20000.00',
    saldoMin: '20000.00',
    movimentacaoMin: '20000.00',
    horarioLimiteAplic: '20:00',
    cnpj: '00.000.000/0000-00',
    gestor: 'LOREM IPSUM',
    plAtual: '00000000.00',
    plMedio12m: '00000000.00',
    dtInicio: '00/00/0000',
    benchmark: 'CDI',
    taxaPerformance: '20% SOBRE O QUE EXCEDER',
  },
  {
    fundo: {
      name: 'BTG Pactual Tesouro IPCA Longo FI RF REF',
      img:
        'http://review.parati.ag/arena/conquista/assets/images/9.1/logo-temp3.png',
      risco: 4,
    },
    aplicacaoMinima: '100,32',
    cotizacao: 'D+15',
    liquidacao: 'D+15',
    taxaAdm: '0,60',
    mes: '0,46%',
    ano: '1,54%',
    ult12meses: '6,11%',
    enabled: false,
    tipo: {
      label: 'Ações',
      valor: 'acoes',
    },
    aplicacao: '20000.00',
    movimentacaoMin: '20000.00',
    saldoMin: '20000.00',
    horarioLimiteAplic: '20:00',
    cnpj: '00.000.000/0000-00',
    gestor: 'LOREM IPSUM',
    plAtual: '00000000.00',
    plMedio12m: '00000000.00',
    dtInicio: '00/00/0000',
    benchmark: 'CDI',
    taxaPerformance: '20% SOBRE O QUE EXCEDER',
  },
  {
    fundo: {
      name: 'Kapitalo Kappa FIN FIQ FIM',
      img:
        'http://review.parati.ag/arena/conquista/assets/images/9.1/logo-temp4.png',
      risco: 5,
    },
    aplicacaoMinima: '2.000,94',
    cotizacao: 'D+50',
    liquidacao: 'D+50',
    taxaAdm: '0,82',
    mes: '0,64%',
    ano: '1,88%',
    ult12meses: '8,13%',
    enabled: true,
    tipo: {
      label: 'Invest. no exterior',
      valor: 'investimentoExterior',
    },
    aplicacao: '20000.00',
    movimentacaoMin: '20000.00',
    saldoMin: '20000.00',
    horarioLimiteAplic: '20:00',
    cnpj: '00.000.000/0000-00',
    gestor: 'LOREM IPSUM',
    plAtual: '00000000.00',
    plMedio12m: '00000000.00',
    dtInicio: '00/00/0000',
    benchmark: 'CDI',
    taxaPerformance: '20% SOBRE O QUE EXCEDER',
  },
  {
    fundo: {
      name: 'Porto Seguro Soberano Referenciado DI Renda Fixa',
      img:
        'http://review.parati.ag/arena/conquista/assets/images/9.1/logo-temp.png',
      risco: 1,
    },
    aplicacaoMinima: '1.000.000,10',
    cotizacao: 'D+40',
    liquidacao: 'D+40',
    taxaAdm: '0,70',
    mes: '0,52%',
    ano: '1,64%',
    ult12meses: '7,11%',
    enabled: true,
    tipo: {
      label: 'Renda fixa',
      valor: 'rendaFixa',
    },
    aplicacao: '20000.00',
    movimentacaoMin: '20000.00',
    saldoMin: '20000.00',
    horarioLimiteAplic: '20:00',
    cnpj: '00.000.000/0000-00',
    gestor: 'LOREM IPSUM',
    plAtual: '00000000.00',
    plMedio12m: '00000000.00',
    dtInicio: '00/00/0000',
    benchmark: 'CDI',
    taxaPerformance: '20% SOBRE O QUE EXCEDER',
  },
]

export const columns = [
  {
    Header: 'Fundo',
    accessor: 'fundo',
    width: '400px',
  },
  {
    Header: 'Aplicação min. (R$)',
    accessor: 'aplicacaoMinima',
    width: '110px',
  },
  {
    Header: 'Resgate',
    width: '240px',
    columns: [
      {
        Header: 'Cotização',
        accessor: 'cotizacao',
        width: '120px',
      },
      {
        Header: 'Liquidação',
        accessor: 'liquidacao',
        width: '120px',
      },
    ],
  },
  {
    Header: 'Taxa Adm. (% A.A.)',
    accessor: 'taxaAdm',
    width: '110px',
  },
  {
    Header: 'Rentabilidade',
    width: '225px',
    columns: [
      {
        Header: 'Mês',
        accessor: 'mes',
        width: '75px',
      },
      {
        Header: 'Ano',
        accessor: 'ano',
        width: '75px',
      },
      {
        Header: 'Últ. 12M',
        accessor: 'ult12meses',
        width: '75px',
      },
    ],
  },
  {
    Header: '',
    accessor: 'enabled',
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
    value: 'rendaFixa',
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
    name: 'Invest. no Exterior',
    value: 'investimentoExterior',
  },
  {
    name: 'Cambial',
    value: 'cambial',
  },
]
