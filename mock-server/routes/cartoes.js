const dataFixtures = require('../fixtures/cartoes-credito');
const erro400 = require('../fixtures/400');
const erro500 = require('../fixtures/500');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/invest/cartoes`);
  server.get(`${urlBase}/invest/cartoes`, (req, res) => {
    const { authorization } = req.headers;
    const { codigoCanal } = req.query;

    if (codigoCanal && Number(codigoCanal) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (codigoCanal && Number(codigoCanal) === 500) {
      return res.status(500).send(erro500);
    }

    let dadosCliente = dataFixtures.find(
      dados => dados.access_token === authorization,
    );

    if (dadosCliente && codigoCanal) {
      dadosCliente.data = dadosCliente.data.filter(
        f => f.CodigoCanal === Number(codigoCanal),
      );
    }

    if (dadosCliente && dadosCliente.data && dadosCliente.data.length) {
      return res.json(dadosCliente.data);
    } else {
      return res.json([]);
    }
  });
};
