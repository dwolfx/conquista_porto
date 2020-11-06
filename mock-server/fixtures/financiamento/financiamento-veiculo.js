const { conservador, moderado, arrojado } = require('../tokens');

module.exports = [
  {
    ...conservador,
    data: [
      {
        id: 1,
        Contrato: 'contrato1',
        Descricao: 'Este é contrato 1 de financiamento',
        Marca: 'Fiat',
        Modelo: 'Palio Weekend',
        PontosGanhos: '50',
        QuantidadeParcelasContratadas: '32',
        QuantidadeParcelasPagas: 1,
        SaldoDevedor: '50000',
        UrlContrato: 'www.google.com.br',
        ValorContratado: '50000',
        ValorEntrada: '10000',
        ValorPago: '25000',
        ValorParcelaAtual: '2500',
        cpf: '33244452809',
        codigoCanal: 0,
      },
      {
        id: 2,
        Contrato: 'contrato2',
        Descricao: 'Este é contrato 1 de financiamento',
        Marca: 'Renault',
        Modelo: 'Sandero',
        PontosGanhos: '50',
        QuantidadeParcelasContratadas: '20',
        QuantidadeParcelasPagas: '12',
        SaldoDevedor: '25000',
        UrlContrato: 'www.google.com.br',
        ValorContratado: '50000',
        ValorEntrada: '10000',
        ValorPago: '25000',
        ValorParcelaAtual: '2500',
        cpf: '33244452809',
        codigoCanal: 0,
      },
    ],
  },
  {
    ...moderado,
    data: {},
  },
  {
    ...arrojado,
    data: {},
  },
];
