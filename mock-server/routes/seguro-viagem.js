const dataFixturesOrcamentoConsultivo = require('../fixtures/seguro-viagem/orcamento-consultivo');
const dataFixturesOrcamentoOferta = require('../fixtures/seguro-viagem/orcamento-oferta');
const dataFixturesPropostasTransmissao = require('../fixtures/seguro-viagem/propostas-transmissao');
const erro400 = require('../fixtures/seguro-viagem/400');
const erro500 = require('../fixtures/seguro-viagem/500');

module.exports = function(server, urlBase) {
  console.log(`[GET] - ${urlBase}/vida/v1/orcamentos/consultivo`);
  server.post(`${urlBase}/vida/v1/orcamentos/consultivo`, (req, res) => {
    // const { authorization } = req.headers;
    const { consultivo, acao } = req.body;

    if (!consultivo || !acao) {
      erro400.message =
        'Contrato de entrada inválido ou parâmetros insuficientes para completar a requisição.';
      return res.status(400).send(erro400);
    }

    return res.json(dataFixturesOrcamentoConsultivo);
  });

  console.log(`[GET] - ${urlBase}/vida/v1/orcamentos/oferta`);
  server.post(`${urlBase}/vida/v1/orcamentos/oferta`, (req, res) => {
    // const { authorization } = req.headers;
    const { consultivo } = req.body;

    // if (!consultivo) {
    //   erro400.message =
    //     'Contrato de entrada inválido ou parâmetros insuficientes para completar a requisição.';
    //   return res.status(400).send(erro400);
    // }
    if (!consultivo) {
      // TODO: parece que o serviço volta 200 :(
      erro400.message =
        'Não foi possível concluir seu orçamento, por favor tente novamente.';
      return res.status(200).send(erro400);
    }

    return res.json(dataFixturesOrcamentoOferta);
  });

  console.log(`[GET] - ${urlBase}/vida/v1/propostas/transmissao`);
  server.post(`${urlBase}/vida/v1/propostas/transmissao`, (req, res) => {
    // const { authorization } = req.headers;
    const { propostas } = req.body;

    if (!propostas) {
      erro400.message =
        'Contrato de entrada inválido ou parâmetros insuficientes para completar a requisição.';
      return res.status(400).send(erro400);
    }

    return res.json(dataFixturesPropostasTransmissao);
  });
};
