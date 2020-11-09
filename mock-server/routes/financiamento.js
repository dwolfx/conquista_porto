const dataFixtures = require('../fixtures/financiamento/financiamento-veiculo');
const erro400 = require('../fixtures/400');
const erro500 = require('../fixtures/500');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/produtos/financiamento`);
  server.get(`${urlBase}/produtos/financiamento`, (req, res) => {
    const { authorization } = req.headers;
    const { codigoCanal } = req.query;

    if (codigoCanal && Number(codigoCanal) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (codigoCanal && Number(codigoCanal) === 500) {
      return res.status(500).send(erro500);
    }

    let financiamentoVeiculo = dataFixtures.find(
      dados => dados.access_token === authorization,
    );

    if (financiamentoVeiculo && codigoCanal) {
      financiamentoVeiculo.data = financiamentoVeiculo.data.filter(
        f => f.codigoCanal === Number(codigoCanal),
      );
    }

    if (
      financiamentoVeiculo &&
      financiamentoVeiculo.data &&
      financiamentoVeiculo.data.length
    ) {
      return res.json(financiamentoVeiculo.data);
    } else {
      return res.json([]);
    }
  });

  console.log(`[GET] - ${urlBase}/invest/financiamentos/auto`);
  server.get(`${urlBase}/invest/financiamentos/auto`, (req, res) => {
    const { authorization } = req.headers;
    const { codigoCanal } = req.query;

    if (codigoCanal && Number(codigoCanal) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (codigoCanal && Number(codigoCanal) === 500) {
      return res.status(500).send(erro500);
    }

    let financiamentoVeiculo = dataFixtures.find(
      dados => dados.access_token === authorization,
    );

    
    if (financiamentoVeiculo && codigoCanal) {
      financiamentoVeiculo.data = financiamentoVeiculo.data.filter(
        f => f.codigoCanal === Number(codigoCanal),
      );
    }

    if (
      financiamentoVeiculo &&
      financiamentoVeiculo.data &&
      financiamentoVeiculo.data.length
    ) {
      return res.json(financiamentoVeiculo.data);
    } else {
      return res.json([]);
    }
  });
};
