const { conservador, moderado, arrojado } = require('./tokens');

module.exports = [
  {
    ...conservador,
    data: {
      Cliente: {
        Cpf: conservador.username,
      },
      consorcios: [
        {
          Id: 1,
          UrlProposta: '',
          DescricaoBem: '',
          ValorContratado: '137132.8',
          Descricao: 'Contrato 889654',
          ValorParcelaAtual: '434.85',
          StatusConsorcio: 'Contemplado',
          QuantidadeParcelasContratadas: '191',
          ValorQuitacao: '30482.77',
          QuantidadeParcelasPagas: '121',
          Grupo: 'I159',
          Cota: '180',
          ValorPago: '108246.07',
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
