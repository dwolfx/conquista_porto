const { conservador, moderado, arrojado } = require('./tokens');

module.exports = [
  {
    ...conservador,
    data: [
      {
        CodigoCanal: 0,
        CpfCnpj: '32036703801',
        Bandeira: 'Visa',
        Fatura: {
          MelhorDataCompra: 22,
          Status: 'Aberta',
          Valor: 25090,
          Vencimento: 16,
        },
        LimiteCartaoAdicional: {
          LimiteCredito: 4588.55,
          LimiteDisponivel: 5000,
          LimiteDisponivelOverlimitt: 1000,
          LimiteSaque: 399.45,
        },
        LimiteTitularCartao: {
          LimiteCredito: 7000.44,
          LimiteDisponivel: 10000,
          LimiteDisponivelOverlimitt: 2000,
          LimiteSaque: 501.33,
        },
        Link: 'string',
        Tipo: 'Gold',
        UltimosDigitos: 3212,
      },
      {
        CodigoCanal: 0,
        CpfCnpj: '33244452809',
        Bandeira: 'Master',
        Fatura: {
          MelhorDataCompra: 12,
          Status: 'Fechada',
          Valor: 25,
          Vencimento: 20,
        },
        limiteCartaoAdicional: {
          LimiteCredito: 9897.43,
          LimiteDisponivel: 6000.55,
          LimiteDisponivelOverlimitt: 800.45,
          LimiteSaque: 1000.5,
        },
        LimiteTitularCartao: {
          LimiteCredito: 7500.61,
          LimiteDisponivel: 8000.44,
          LimiteDisponivelOverlimitt: 700.88,
          LimiteSaque: 989.33,
        },
        Link: 'string',
        Tipo: 'Platinum',
        UltimosDigitos: 3901,
      },
    ],
  },
  {
    ...moderado,
    data: [],
  },
  {
    ...arrojado,
    data: []
  },
];
