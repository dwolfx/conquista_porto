const dataFixturesImovel = require('../fixtures/consorcios/consorcios-imovel');
const dataFixturesAuto = require('../fixtures/consorcios/consorcios-auto');
const erro400 = require('../fixtures/400');
const erro500 = require('../fixtures/500');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/invest/consorcios/imovel`);
  server.get(`${urlBase}/invest/consorcios/imovel`, (req, res) => {
    const { authorization } = req.headers;
    const { codigoCanal } = req.query;

    if (codigoCanal && Number(codigoCanal) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (codigoCanal && Number(codigoCanal) === 500) {
      return res.status(500).send(erro500);
    }

    let imoveis = dataFixturesImovel.find(
      dados => dados.access_token === authorization,
    );

    // if (imoveis && codigoCanal) {
    //   imoveis.data = imoveis.data.filter(
    //     f => f.CodigoCanal === Number(codigoCanal),
    //   );
    // }

    if (imoveis && imoveis.data) {
      return res.json(imoveis.data);
    } else {
      return res.json({});
    }
  });

  console.log(`[GET] - ${urlBase}/invest/consorcios/auto`);
  server.get(`${urlBase}/invest/consorcios/auto`, (req, res) => {
    const { authorization } = req.headers;
    const { codigoCanal } = req.query;

    if (codigoCanal && Number(codigoCanal) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (codigoCanal && Number(codigoCanal) === 500) {
      return res.status(500).send(erro500);
    }

    let imoveis = dataFixturesAuto.find(
      dados => dados.access_token === authorization,
    );

    // if (imoveis && codigoCanal) {
    //   imoveis.data = imoveis.data.filter(
    //     f => f.CodigoCanal === Number(codigoCanal),
    //   );
    // }

    if (imoveis && imoveis.data) {
      return res.json(imoveis.data);
    } else {
      return res.json({});
    }
  });
};
