const dataFixtures = require('../fixtures/auth');
const erro403 = require('../fixtures/403');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/dev/oauth/access-token`);
  server.post(`${urlBase}/dev/oauth/access-token`, (req, res) => {
    // Nesse serviço recebemos um token de serviço, e nao um token de usuario
    // apesar de ser o cliente que chama :)
    // ou seja a resposta e sempre igual e nao por usuário

    const accessToken = dataFixtures[0];

    if (accessToken) {
      const response = accessToken.data;

      return res.json(response);
    } else {
      return setTimeout(() => {
        return res.status(403).json(erro403);
      }, 3000);
    }
  });
};
