const { conservador, moderado, arrojado } = require('../tokens');

const suitability = {
  idpessoa: 632,
  idperfilinvest: 3,
  nomeperfilinvest: 'Arrojado',
};

module.exports = [
  {
    ...conservador,
    data: suitability,
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
