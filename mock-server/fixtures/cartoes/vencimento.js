const { conservador, moderado, arrojado } = require('../tokens');

const bandeiras = {
  bandeiras: [
    {
      bandeira: 'VISA',
      codBandeira: 1,
      descricao: 1,
    },
  ],
  codRetorno: 0,
  msgRetorno: 'Consulta realizada com sucesso.',
};

module.exports = [
  {
    ...conservador,
    data: bandeiras,
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
