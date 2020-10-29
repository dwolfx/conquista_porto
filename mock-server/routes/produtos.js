const dataFixturesViagem = require('../fixtures/seguro-viagem');
const dataFixturesVida = require('../fixtures/seguro-vida');
const erro400 = require('../fixtures/400');
const erro500 = require('../fixtures/500');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/invest/produtos/vida`);
  server.get(`${urlBase}/invest/produtos/vida`, (req, res) => {
    const { authorization } = req.headers;
    const { codigoCanal, tipoSeguro } = req.query;

    if (codigoCanal && Number(codigoCanal) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (codigoCanal && Number(codigoCanal) === 500) {
      return res.status(500).send(erro500);
    }

    let produto;

    if (tipoSeguro === 'VIDA') {
      produto = dataFixturesVida.find(
        dados => dados.access_token === authorization,
      );
    } else if (tipoSeguro === 'VIAGEM') {
      produto = dataFixturesViagem.find(
        dados => dados.access_token === authorization,
      );
    }

    // if (data && codigoCanal) {
    //   data.data = data.data.filter(
    //     f => f.CodigoCanal === Number(codigoCanal),
    //   );
    // }

    if (produto && produto.data) {
      return res.json(produto.data);
    } else {
      return res.json({});
    }
  });
};
