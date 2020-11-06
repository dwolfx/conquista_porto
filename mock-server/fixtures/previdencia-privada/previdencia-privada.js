const { conservador, moderado, arrojado } = require('../tokens');

module.exports = [
  {
    ...conservador,
    data: [
      {
        coberturas: [
          {
            capitalSegurado: 0,
            detalhe: 'string',
            nome: 'string',
          },
        ],
        codigoOrigem: 0,
        dataFimVigencia: '2019-12-24T13:10:48.998Z',
        dataInicioVigencia: '2019-12-24T13:10:48.998Z',
        dataValorSaldoAtual: '2019-12-24T13:10:48.998Z',
        fundos: [
          {
            nome: 'string',
            percentualDistribuicao: 0,
            urlPDF: 'string',
            valor: 0,
            valorTotal: 0,
          },
        ],
        idadeBeneficio: 0,
        idadePrevisao: 0,
        modalidade: 'string',
        nomeInstituidor: 'string',
        nomeParticipante: 'string',
        nomePlano: 'string',
        nomeProduto: 'string',
        nomeStatusProposta: 'ATIVA',
        numeroProposta: 0,
        pontosGanhos: 0,
        propostaComplementoAuto: 0,
        qtdAnosSaldoPrevisao: 0,
        regimeTributario: 'string',
        rendimentoUltimoAno: 0,
        saldoAtual: 0,
        saldoPrevisao: 0,
        saldos: [
          {
            mesAno: 'string',
            valor: 0,
          },
        ],
        statusPrevidencia: 'string',
        taxaAnualRendimento: 0,
        tipo: 'string',
        tipoCobertura: 'string',
        tipoProduto: 'string',
        valorCoberturaVida: 0,
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
