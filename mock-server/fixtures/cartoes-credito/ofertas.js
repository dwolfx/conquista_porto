const { conservador, moderado, arrojado } = require('../tokens');

const ofertas = {
  codigoOferta: 3,
  codigoRetorno: 0,
  idSimulacao: 1503,
  mensagem: {
    mensagem: 'SUCESSO',
    tipoCritica: 'SUCESSO',
  },
  mensagemOferta: 'Cartões Visa e Master disponíveis.',
};

module.exports = [
  {
    ...conservador,
    data: ofertas,
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
