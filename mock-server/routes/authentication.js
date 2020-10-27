const dataFixtures = require('../fixtures/auth');
const erro401 = require('../fixtures/401');

module.exports = function(server, urlBase) {
  // TODO: FALTA serviço funcionando para poder criar MOCK
  console.log(`[GET] - ${urlBase}/dev/loyalty/v2/authentication/token`);
  server.post(`${urlBase}/dev/loyalty/v2/authentication/token`, (req, res) => {
    const { authorization } = req.headers;

    const auth = dataFixtures.find(
      dados => dados.access_token === authorization,
    );

    if (auth) {
      const response = auth.token;

      return res.json(response);
    } else {
      return setTimeout(() => {
        return res.status(401).json(erro401);
      }, 3000);
    }
  });
};
