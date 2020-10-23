const auths = require('../fixtures/auth');
const erro401 = require('../fixtures/401');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/auth2/clientes/login`);
  server.post(`${urlBase}/auth2/clientes/login`, (req, res) => {
    const { username, password } = req.body;

    const auth = auths.find(
      auth => auth.username === username && auth.password === password,
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
