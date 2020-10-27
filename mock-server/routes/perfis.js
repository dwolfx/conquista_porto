const dataFixtures = require('../fixtures/users');
const erro404 = require('../fixtures/404');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/invest/perfil/dados-cliente`);
  server.get(`${urlBase}/invest/perfil/dados-cliente`, (req, res) => {
    const { authorization } = req.headers;

    const dadosCliente = dataFixtures.find(
      dados => dados.access_token === authorization,
    );

    if (dadosCliente) {
      const response = dadosCliente.data;

      return res.json(response);
    } else {
      return setTimeout(() => {
        return res.status(404).json(erro404);
      }, 3000);
    }
  });
};
