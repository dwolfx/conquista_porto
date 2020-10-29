const { conservador, moderado, arrojado } = require('./tokens');

module.exports = [
  {
    ...conservador,
    data: {
      cliente: {
        Sobrenome: 'Rodrigues',
        Nome: 'Rafael',
      },
      consorcios: [
        {
          UrlProposta: '',
          DescricaoBem: 'ONIX HATCH LT 1.4 8V',
          ValorContratado: '52432',
          Descricao: 'Contrato 4000044932',
          ValorParcelaAtual: '838.01',
          StatusConsorcio: 'Não Contemplado',
          QuantidadeParcelasContratadas: '74',
          ValorQuitacao: '46026.8',
          QuantidadeParcelasPagas: '18',
          Marca: '',
          Modelo: '',
          Grupo: 'A241',
          Cota: '124',
          ValorPago: '14777.26',
          PontosGanhos: '100',
        },
        {
          UrlProposta: '',
          DescricaoBem: '',
          ValorContratado: '25958',
          Descricao: 'Contrato 321594',
          ValorParcelaAtual: '0',
          StatusConsorcio: 'Contemplado',
          QuantidadeParcelasContratadas: '80',
          ValorQuitacao: '0',
          QuantidadeParcelasPagas: '80',
          Marca: '',
          Modelo: '',
          Grupo: 'A104',
          Cota: '123',
          ValorPago: '31792.5',
          PontosGanhos: '100',
        },
      ],
    },
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
