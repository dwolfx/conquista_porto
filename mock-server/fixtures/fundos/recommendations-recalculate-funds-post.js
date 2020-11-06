const { conservador, moderado, arrojado } = require('../tokens');

const recomendation = {
  target_date: '01/08/2050',
  fund_list: [
    {
      category: 'Renda Variável',
      fund_id: 51380023,
      initial_amount: 1100,
      monthly_amount: 100,
    },
    {
      category: 'Renda Fixa',
      fund_id: 5138002,
      initial_amount: 1000,
      monthly_amount: 100,
    },
  ],
};

module.exports = [
  {
    ...conservador,
    data: recomendation,
  },
  {
    ...moderado,
    data: null,
  },
  {
    ...arrojado,
    data: null,
  },
];
