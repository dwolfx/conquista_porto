const { conservador, moderado, arrojado } = require('../tokens');

const message = {
  TipoCritica: 'SUCESSO',
  Mensagem: 'SUCESSO',
};

module.exports = [
  {
    ...conservador,
    data: {
      Message: message,
      detalheExtratoOptemaisTypes: [
        {
          pontoGanho: '200',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CONQUISTA',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '01/10/2020',
        },
        {
          pontoGanho: '100',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CONQUISTA PRIMEIRO OBJETIVO',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '01/10/2020',
        },
        {
          pontoGanho: '250',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CONQUISTA CADASTRO',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '01/10/2020',
        },
        {
          pontoGanho: '250000000',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CARTÃO PORTO SEGURO',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '01/10/2020',
        },
        {
          pontoGanho: '250000000',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CARTÃO PORTO SEGURO',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '01/10/2020',
        },
        {
          pontoGanho: '250000000',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CARTÃO PORTO SEGURO',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '01/10/2020',
        },
        {
          pontoGanho: '250000000',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CARTÃO PORTO SEGURO',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '01/10/2020',
        },
        {
          pontoGanho: '250000000',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CARTÃO PORTO SEGURO',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '01/10/2020',
        },
        {
          pontoGanho: '250000000',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CARTÃO PORTO SEGURO',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '01/10/2020',
        },
      ],
    },
  },
  {
    ...moderado,
    data: {
      Message: message,
    },
  },
  {
    ...arrojado,
    data: {
      Message: message,
    },
  },
];
