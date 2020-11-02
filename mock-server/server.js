/* eslint-disable no-console */
// REF: http://expressjs.com/
const express = require('express');

const app = express();
const path = require('path');

// const _ = require('lodash');
const bodyParser = require('body-parser');
const cors = require('cors');
const authorization = require('./middlewares/authorization');

const urlBase = '/api';

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authorization);

// REF: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

const staticPath = path.join(__dirname, 'definition/');
console.log('/static', staticPath);

app.use('/static', express.static(staticPath));

const router = express.Router();

// Auth
require('./routes/auth')(app, urlBase);
require('./routes/auth2')(app, urlBase);
require('./routes/authentication')(app, urlBase);

require('./routes/perfis')(app, urlBase);
require('./routes/cartoes')(app, urlBase);
require('./routes/consorcios')(app, urlBase);
require('./routes/previdencia-privada')(app, urlBase);
require('./routes/financiamento')(app, urlBase);
require('./routes/programa-pontos')(app, urlBase);
require('./routes/produtos')(app, urlBase);
require('./routes/fundos')(app, urlBase);
require('./routes/atlas')(app, urlBase);
require('./routes/extrato')(app, urlBase);
require('./routes/notificacao')(app, urlBase);

app.use(urlBase, router);

app.listen(3001, () => {
  console.log(`JSON Server is running in [ http://localhost:3001${urlBase} ]`);
  console.log(
    'SWAGGER Server is running in [ http://localhost:3001/static/swagger-ui/index.html ]',
  );
});
