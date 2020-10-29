const { conservador, moderado, arrojado } = require('./tokens');

const _consolidado = {
  saldo_total: 20655214.49,
  categorias: [
    {
      nome: 'Renda Variável',
      valor: 3463712.95,
    },
    {
      nome: 'Renda Fixa',
      valor: 566894.46,
    },
    {
      nome: 'Multimercado',
      valor: 16488884.2,
    },
    {
      nome: 'Cambial',
      valor: 47424.17,
    },
    {
      nome: 'Investimento no exterior',
      valor: 88298.71,
    },
  ],
};

module.exports = [
  {
    ...conservador,
    data: _consolidado,
  },
  {
    ...moderado,
    data: _consolidado,
  },
  {
    ...arrojado,
    data: _consolidado,
  },
];
