const faker = require('faker');

const dataFixturesCartoes = require('../fixtures/cartoes-credito/cartoes');
const dataFixturesClientes = require('../fixtures/cartoes-credito/clientes');
const dataFixturesVencimento = require('../fixtures/cartoes-credito/vencimento');
const dataFixturesOfertas = require('../fixtures/cartoes-credito/ofertas');
const dataFixturesProfissoes = require('../fixtures/cartoes-credito/profissoes');
const erro400 = require('../fixtures/400');
const erro500 = require('../fixtures/500');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/invest/cartoes`);
  server.get(`${urlBase}/invest/cartoes`, (req, res) => {
    const { authorization } = req.headers;
    const { codigoCanal } = req.query;

    if (codigoCanal && Number(codigoCanal) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (codigoCanal && Number(codigoCanal) === 500) {
      return res.status(500).send(erro500);
    }

    let cartoes = dataFixturesCartoes.find(
      dados => dados.access_token === authorization,
    );

    if (cartoes && codigoCanal) {
      cartoes.data = cartoes.data.filter(
        f => f.CodigoCanal === Number(codigoCanal),
      );
    }

    if (cartoes && cartoes.data && cartoes.data.length) {
      return res.json(cartoes.data);
    } else {
      return res.json([]);
    }
  });

  console.log(
    `[GET] - ${urlBase}/investimento/aws/v1/cartoes/dados/cliente/cadastrado`,
  );
  server.get(
    `${urlBase}/investimento/aws/v1/cartoes/dados/cliente/cadastrado`,
    (req, res) => {
      const { authorization } = req.headers;

      let cliente = dataFixturesClientes.find(
        dados => dados.access_token === authorization,
      );

      return res.json(cliente.data);
    },
  );

  console.log(`[GET] - ${urlBase}/investimento/aws/v1/cartoes/dia/vencimento`);
  server.get(
    `${urlBase}/investimento/aws/v1/cartoes/dia/vencimento`,
    (req, res) => {
      const { authorization } = req.headers;
      const { codigo_canal } = req.query;

      if (!codigo_canal) {
        erro400.error_description = "falta parametro 'codigo_canal'";
        return res.status(400).json(erro400);
      }

      let bandeiras = dataFixturesVencimento.find(
        dados => dados.access_token === authorization,
      );

      return res.json(bandeiras.data);
    },
  );

  console.log(`[GET] - ${urlBase}/investimento/aws/v1/cartoes/ofertas`);
  server.get(`${urlBase}/investimento/aws/v1/cartoes/ofertas`, (req, res) => {
    const { authorization } = req.headers;

    const { codigoCanal, dataNascimento, nome, uf } = req.query;

    if (!codigoCanal || !dataNascimento || !nome || !uf) {
      erro400.error_description =
        "falta de parametro 'codigoCanal, dataNascimento, nome, uf'";
      return res.status(400).json(erro400);
    }

    let bandeiras = dataFixturesOfertas.find(
      dados => dados.access_token === authorization,
    );

    return res.json(bandeiras.data);
  });

  console.log(`[GET] - ${urlBase}/investimento/aws/v1/cartoes/profissoes`);
  server.get(
    `${urlBase}/investimento/aws/v1/cartoes/profissoes`,
    (req, res) => {
      const { authorization } = req.headers;

      let bandeiras = dataFixturesProfissoes.find(
        dados => dados.access_token === authorization,
      );

      return res.json(bandeiras.data);
    },
  );

  console.log(`[GET] - ${urlBase}/investimento/aws/v1/cartoes/solicitacao`);
  server.post(
    `${urlBase}/investimento/aws/v1/cartoes/solicitacao`,
    (req, res) => {
      // const { authorization } = req.headers;
      // TODO: verificar qual a finalizade e possibilidade de mockar

      const dados = {
        codigoRetorno: 0,
        mensagem: {
          mensagem: 'SUCESSO',
          tipoCritica: 'SUCESSO',
        },
        numeroProposta: faker.random.number(999),
      };

      return res.json(dados);
    },
  );
};
