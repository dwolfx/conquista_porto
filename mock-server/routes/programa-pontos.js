const dataFixturesExtrato = require('../fixtures/pontos-extrato');
const dataFixturesConsultar = require('../fixtures/pontos-consultar');
const erro404 = require('../fixtures/404');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/invest/programa-pontos/extrato`);
  server.get(`${urlBase}/invest/programa-pontos/extrato`, (req, res) => {

    const { authorization } = req.headers;

    const programaPontos = dataFixturesExtrato.find(
      dados => dados.access_token === authorization,
    );

    if (programaPontos) {
      const response = programaPontos.data;

      return res.json(response);
    } else {
      return setTimeout(() => {
        return res.status(404).json(erro404);
      }, 3000);
    }
  });

  console.log(`[GET] - ${urlBase}/invest/programa-pontos/consultar-pontos`);
  server.get(`${urlBase}/invest/programa-pontos/consultar-pontos`, (req, res) => {
    const { authorization } = req.headers;

    const programaPontos = dataFixturesConsultar.find(
      dados => dados.access_token === authorization,
    );

    if (programaPontos) {
      const response = programaPontos.data;

      return res.json(response);
    } else {
      return setTimeout(() => {
        return res.status(404).json(erro404);
      }, 3000);
    }
  });
};
