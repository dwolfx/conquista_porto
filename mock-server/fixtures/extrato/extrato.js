const { conservador, moderado, arrojado } = require('../tokens');

const _extrato = {
  transacoes: {
    transacao: [
      {
        tipo: 'APLICAÇÃO',
        data: '2019-09-03T00:00:00-03:00',
        valor: '-100',
      },
      {
        tipo: 'APLICAÇÃO',
        data: '2019-07-03T00:00:00-03:00',
        valor: '-500',
      },
      {
        tipo: 'TED',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100',
      },
      {
        tipo: 'APLICAÇÃO',
        data: '2019-09-03T00:00:00-03:00',
        valor: '-100',
      },
      {
        tipo: 'APLICAÇÃO',
        data: '2019-07-03T00:00:00-03:00',
        valor: '-500',
      },
      {
        tipo: 'TED',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100',
      },
      {
        tipo: 'APLICAÇÃO',
        data: '2019-09-03T00:00:00-03:00',
        valor: '-100',
      },
      {
        tipo: 'APLICAÇÃO',
        data: '2019-07-03T00:00:00-03:00',
        valor: '-500',
      },
      {
        tipo: 'TED',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100',
      },
      {
        tipo: 'APLICAÇÃO',
        data: '2019-09-03T00:00:00-03:00',
        valor: '-100',
      },
      {
        tipo: 'APLICAÇÃO',
        data: '2019-07-03T00:00:00-03:00',
        valor: '-500',
      },
      {
        tipo: 'TED',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100',
      },
      {
        tipo: 'APLICAÇÃO',
        data: '2019-09-03T00:00:00-03:00',
        valor: '-100',
      },
      {
        tipo: 'APLICAÇÃO',
        data: '2019-07-03T00:00:00-03:00',
        valor: '-500',
      },
      {
        tipo: 'TED',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100',
      },
    ],
  },
  // TODO: Verificar como fazer para cada perfil
  conta: {
    'xsi:type': 'ns3:ContaPortoSeguroType',
    conta: '47',
    cpf: '030302151',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    digito_conta: '0',
    nome_titular: 'Código Conquista',
    agencia: '0001',
    titular: 'Código Conquista',
    codigo_banco: '420',
  },
};

module.exports = [
  {
    ...conservador,
    data: _extrato,
  },
  {
    ...moderado,
    data: _extrato,
  },
  {
    ...arrojado,
    data: _extrato,
  },
];
