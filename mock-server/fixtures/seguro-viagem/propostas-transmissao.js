module.exports = {
  validacoesEstruturais: {
    valido: false,
    problemas: [
      {
        codigo: 242,
        integracao: '2.4.2',
        descricao:
          'Problema na transmissão. Verifique os dados preenchidos, caso o erro persista favor entrar em contato com administradora do cartão.',
      },
    ],
  },
  retornoFinanceiro: {
    autorizacaoCartao: {
      codigo: null,
      mensagem: '',
      codigoGateway: null,
      mensagemGateway: '',
    },
  },
  devolutivasPropostas: [],
};
