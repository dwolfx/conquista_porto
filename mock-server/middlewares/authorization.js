const auths = require('../fixtures/auth');
const erro401 = require('../fixtures/401');
const faker = require('faker');

module.exports = function(req, res, next) {
  const tokensValid = auths.map(auth => `Bearer ${auth.token.access_token}`);

  const isValidAuthorization = tokensValid.includes(req.headers.authorization);

  const isCORS = req.method === 'OPTIONS';

  const notAuthenticatedUrls = ['/api/auth2/clientes/login'];
  const isUnauthenticatedRoute = notAuthenticatedUrls.includes(req.url);

  const staticFiles = req.url.indexOf('/static') >= 0;

  if (isCORS) {
    next();
  } else if (staticFiles || isValidAuthorization || isUnauthenticatedRoute) {
    // Adicionar um sleep pra simular demora da requisição
    const delay = faker.random.number({ min: 500, max: 4000 });
    setTimeout(next, delay);
    //next();
  } else {
    res.status(401).jsonp(erro401);
  }
};
