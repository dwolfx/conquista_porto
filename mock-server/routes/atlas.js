const dataFixturesPosicao = require('../fixtures/posicao2');
const dataFixturesConsolidado = require('../fixtures/consolidado');
const dataFixturesUltimasMovimentacoes = require('../fixtures/ultimas-movimentacoes');
const dataFixturesFundosLista = require('../fixtures/fundos-lista');
const dataFixturesFundoDetalhe = require('../fixtures/fundo-detalhe');
const dataFixturesRentabilidade = require('../fixtures/rentabilidade');
const dataFixturescomparativeProfitability = require('../fixtures/comparative-profitability');
const erro400 = require('../fixtures/400');
const erro404 = require('../fixtures/404');
const erro500 = require('../fixtures/500');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/invest/atlas/cotista/posicao`);
  server.get(`${urlBase}/invest/atlas/cotista/posicao`, (req, res) => {
    const { authorization } = req.headers;

    // TODO: melhorar colocando dados corretos para cada perfil
    let dadosCliente = dataFixturesPosicao.find(
      dados => dados.access_token === authorization,
    );

    return res.json(dadosCliente.data);
  });

  console.log(`[GET] - ${urlBase}/invest/atlas/cotista/posicao/consolidado`);
  server.get(
    `${urlBase}/invest/atlas/cotista/posicao/consolidado`,
    (req, res) => {
      const { authorization } = req.headers;

      // TODO: melhorar colocando dados corretos para cada perfil
      let dadosCliente = dataFixturesConsolidado.find(
        dados => dados.access_token === authorization,
      );

      return res.json(dadosCliente.data);
    },
  );

  console.log(
    `[GET] - ${urlBase}/invest/atlas/cotista/ultimas/movimentacoes/:id_fundo`,
  );
  server.get(
    `${urlBase}/invest/atlas/cotista/ultimas/movimentacoes/:id_fundo`,
    (req, res) => {
      // const { authorization } = req.headers;
      const id_fundo = req.params.id_fundo;

      if (id_fundo && Number(id_fundo) === 400) {
        erro400.message = 'ERRO FORÇADO.';
        return res.status(400).send(erro400);
      } else if (id_fundo && Number(id_fundo) === 500) {
        return res.status(500).send(erro500);
      }

      // TODO: melhorar colocando dados corretos para cada perfil
      let movimentacoes = dataFixturesUltimasMovimentacoes.filter(
        dados => dados.id_fundo === Number(id_fundo),
      );

      if (movimentacoes && movimentacoes.length) {
        return res.json(movimentacoes);
      } else {
        return res.status(404).send(erro404);
      }
    },
  );

  console.log(`[GET] - ${urlBase}/invest/atlas/fundo/grade`);
  server.get(`${urlBase}/invest/atlas/fundo/grade`, (req, res) => {
    // const { authorization } = req.headers;
    const { codigoCanal } = req.query;

    if (codigoCanal && Number(codigoCanal) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (codigoCanal && Number(codigoCanal) === 500) {
      return res.status(500).send(erro500);
    }

    return res.json(dataFixturesFundosLista);
  });

  console.log(`[GET] - ${urlBase}/invest/atlas/fundo/detalhes/:idFundo`);
  server.get(`${urlBase}/invest/atlas/fundo/detalhes/:idFundo`, (req, res) => {
    // const { authorization } = req.headers;
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

  console.log(`[GET] - ${urlBase}/invest/atlas/fundo/rentabilidade/:idFundo`);
  server.get(
    `${urlBase}/invest/atlas/fundo/rentabilidade/:idFundo`,
    (req, res) => {
      // const { authorization } = req.headers;
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

      return res.json(dataFixturesRentabilidade);
    },
  );

  console.log(
    `[GET] - ${urlBase}/invest/atlas/fundo/rentabilidade/comparativo/:idFundo`,
  );
  server.get(
    `${urlBase}/invest/atlas/fundo/rentabilidade/comparativo/:idFundo`,
    (req, res) => {
      // const { authorization } = req.headers;
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

      return res.json(dataFixturescomparativeProfitability);
    },
  );
};
