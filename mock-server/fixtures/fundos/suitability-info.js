const { conservador, moderado, arrojado } = require('../tokens');

const suitability = {
  status_cotista: true,
  CotistaContaOrdemPortoPar: 'S',
  investidor_qualificado: 'N',
  investidor_profissional: 'N',
  codigo_status_cotista: '122',
  id_cotista: '2000143425',
  status_possui_suitability: true,
  status_data_vigencia_suitability: true,
  status_data_vencimento_cadastro: false,
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
