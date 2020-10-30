const moment = require('moment');

const dataFixturesNotificacoes = require('../fixtures/notificacoes');
const erro400 = require('../fixtures/400');
const erro404 = require('../fixtures/404');
const erro500 = require('../fixtures/500');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/notificacao/buscar/:cpf`);
  server.get(`${urlBase}/notificacao/buscar/:cpf`, (req, res) => {
    // const { authorization } = req.headers;

    // TODO: Acredito que esse parametro devereia ser removido da URL, rs
    // eslint-disable-next-line no-unused-vars
    const { cpf } = req.params;
    if (cpf && Number(cpf) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (cpf && Number(cpf) === 500) {
      return res.status(500).send(erro500);
    }

    const novas = dataFixturesNotificacoes.filter(n => n.lida === false);
    const anteriores = dataFixturesNotificacoes.filter(n => n.lida === true);

    let extrato = {
      novas,
      anteriores,
    };

    return res.json(extrato);
  });

  console.log(`[GET] - ${urlBase}/notificacao/lida/:id/:cpf`);
  server.get(`${urlBase}/notificacao/lida/:id/:cpf`, (req, res) => {
    // const { authorization } = req.headers;

    // TODO: Acredito que esse parametro devereia ser removido da URL, rs
    // eslint-disable-next-line no-unused-vars
    const { id, cpf } = req.params;

    if (id && Number(id) === 400) {
      erro400.message = 'ERRO FORÇADO.';
      return res.status(400).send(erro400);
    } else if (id && Number(id) === 500) {
      return res.status(500).send(erro500);
    }

    const index = dataFixturesNotificacoes.findIndex(e => {
      return e.idNotificacao === Number(id);
    });

    if (index >= 0) {
      const newNotificacao = {
        ...dataFixturesNotificacoes[index],
        lida: true,
        tipoNotificacao: {
          ...dataFixturesNotificacoes[index].tipoNotificacao,
          dataHoraUltimaAtualizacao: moment().unix(),
        },
      };
      dataFixturesNotificacoes[index] = newNotificacao;

      return res.json(newNotificacao);
    } else {
      return res.status(404).json(erro404);
    }
  });
};
