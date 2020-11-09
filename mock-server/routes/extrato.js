const dataFixturesExtrato = require('../fixtures/extrato/extrato');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/conta/extrato`);
  server.get(`${urlBase}/conta/extrato`, (req, res) => {
    const { authorization } = req.headers;

    // eslint-disable-next-line no-unused-vars
    const { tipoFiltro, dataInicial, dataFinal } = req.query;

    let extrato = dataFixturesExtrato.find(
      dados => dados.access_token === authorization,
    );

    if(extrato.data && tipoFiltro) {
      extrato.data.transacoes.transacao = extrato.data.transacoes.transacao.filter(t => t.tipo === tipoFiltro)
    }

    return res.json(extrato.data);
  });
};
