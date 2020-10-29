const dataFixturesFundosLista = require('../fixtures/fundos-lista');
const dataFixturesFundoDetalhe = require('../fixtures/fundo-detalhe');
const dataFixturesMovimentacoes = require('../fixtures/movimentacoes');
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
};
