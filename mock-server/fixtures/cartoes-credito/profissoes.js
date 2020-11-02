const { conservador, moderado, arrojado } = require('../tokens');

const profissoes = {
  descricaoErro: 'Profissoes buscadas com sucesso.',
  profissoesVO: [
    {
      codProduto: 0,
      codProfissaoProduto: 1,
      codUsuarioAlteracao: 'P0621470',
      dataAlteracao: {},
      dataInclusao: {},
      nome: 'MÉDICO',
    },
  ],
};

module.exports = [
  {
    ...conservador,
    data: profissoes,
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
