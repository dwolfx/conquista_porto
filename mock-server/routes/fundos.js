const dataFixturesFundosLista = require('../fixtures/fundos/fundos-lista');
const dataFixturesFundoDetalhe = require('../fixtures/fundos/fundo-detalhe');
const dataFixturesMovimentacoes = require('../fixtures/fundos/movimentacoes');
const dataFixturesPosicaoConsolidada = require('../fixtures/fundos/posicao-consolidada');
const dataFixturesSuitability = require('../fixtures/fundos/suitability');
const dataFixturesSuitabilityInfo = require('../fixtures/fundos/suitability-info');
const dataFixturesGoalRecommendations = require('../fixtures/fundos/goal-recommendations');
const dataFixturesRecommendationsRecalculateFunds = require('../fixtures/fundos/recommendations-recalculate-funds-post');
const erro400 = require('../fixtures/400');
const erro404 = require('../fixtures/404');
const erro500 = require('../fixtures/500');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/invest/fundos`);
  server.get(`${urlBase}/invest/fundos`, (req, res) => {
    const { codigoCanal } = req.query;

    if (codigoCanal && Number(codigoCanal) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (codigoCanal && Number(codigoCanal) === 500) {
      return res.status(500).send(erro500);
    }

    return res.json(dataFixturesFundosLista);
  });

  // TODO: verificar como popular com dados melhores
  console.log(`[GET] - ${urlBase}/invest/fundos/:fundId`);
  server.get(`${urlBase}/invest/fundos/:fundId`, (req, res) => {
    // const { codigoCanal } = req.query;
    const { fundId } = req.params;

    if (fundId && Number(fundId) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (fundId && Number(fundId) === 404) {
      return res.status(404).send(erro404);
    } else if (fundId && Number(fundId) === 500) {
      return res.status(500).send(erro500);
    }

    return res.json(dataFixturesFundoDetalhe);
  });

  // TODO: verificar como popular com dados melhores
  console.log(`[GET] - ${urlBase}/invest/fundos/movimentacoes`);
  server.get(`${urlBase}/invest/fundos/movimentacoes`, (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { idFundo, tipoFiltro, dataInicial, dataFinal } = req.query;

    if (idFundo && Number(idFundo) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (idFundo && Number(idFundo) === 500) {
      return res.status(500).send(erro500);
    }

    return res.json(dataFixturesMovimentacoes);
  });

  console.log(`[GET] - ${urlBase}/cotistas/posicao`);
  server.get(`${urlBase}/cotistas/posicao`, (req, res) => {
    const { authorization } = req.headers;

    let posicao = dataFixturesPosicaoConsolidada.find(
      dados => dados.access_token === authorization,
    );

    if (posicao && posicao.data && posicao.data.length) {
      return res.json(posicao.data);
    } else {
      return res.json([]);
    }
  });

  console.log(`[GET] - ${urlBase}/invest/portopar/cotista/perfil/investidor`);
  server.get(
    `${urlBase}/invest/portopar/cotista/perfil/investidor`,
    (req, res) => {
      const { authorization } = req.headers;

      let suitability = dataFixturesSuitability.find(
        dados => dados.access_token === authorization,
      );

      if (suitability && suitability.data) {
        return res.json(suitability.data);
      } else {
        return res.json({});
      }
    },
  );

  console.log(`[GET] - ${urlBase}/invest/cotista/status`);
  server.get(`${urlBase}/invest/cotista/status`, (req, res) => {
    const { authorization } = req.headers;

    let suitability = dataFixturesSuitabilityInfo.find(
      dados => dados.access_token === authorization,
    );

    if (suitability && suitability.data) {
      return res.json(suitability.data);
    } else {
      return res.json({});
    }
  });

  console.log(`[GET] - ${urlBase}/recommendation/recommendations`);
  server.get(`${urlBase}/recommendation/recommendations`, (req, res) => {
    const { authorization } = req.headers;
    // eslint-disable-next-line no-unused-vars
    const { mobile } = req.query;

    let recommendation = dataFixturesGoalRecommendations.find(
      dados => dados.access_token === authorization,
    );

    if (recommendation && recommendation.data) {
      return res.json(recommendation.data);
    } else {
      return res.json({});
    }
  });

  console.log(`[GET] - ${urlBase}/recommendation/recommendations/recalculate-funds`);
  server.post(`${urlBase}/recommendation/recommendations/recalculate-funds`, (req, res) => {
    const { authorization } = req.headers;
    // eslint-disable-next-line no-unused-vars
    const { mobile } = req.query;
    // TODO: Falta saber o que recebe e o que deve fazer nesse serviço

    let recommendation = dataFixturesRecommendationsRecalculateFunds.find(
      dados => dados.access_token === authorization,
    );

    if (recommendation && recommendation.data) {
      return res.json(recommendation.data);
    } else {
      return res.json({});
    }
  });
};
