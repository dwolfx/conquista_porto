const auths = require('../fixtures/auth');
const erro401 = require('../fixtures/401');
const faker = require('faker');

// variavel de ambiente do REACT
// process.env.REACT_APP_SENSEDIA_AUTHORIZATION_ACCESS_TOKEN
const REACT_APP_SENSEDIA_AUTHORIZATION_ACCESS_TOKEN =
  'Basic M2E0YWY1NjUtMjA0NS0zNjllLWFmZDAtN2U4MmU4NTgzMjIxOjg3MmQwOTRhLTk3YzYtMzNlMi05YzQ3LWIzMThlYjg1NTQ5NA==';

module.exports = function(req, res, next) {
  const tokensValid = auths.map(auth => `Bearer ${auth.data.access_token}`);
  tokensValid.push(REACT_APP_SENSEDIA_AUTHORIZATION_ACCESS_TOKEN);

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
