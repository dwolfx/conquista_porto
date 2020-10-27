const { conservador, moderado, arrojado } = require('./tokens');

module.exports = [
  {
    ...conservador,
    password: 'senha123',
    data: {
      access_token: conservador.access_token.replace('Bearer ', ''),
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: '353174f2-c208-4a88-a877-d5363d8359a4',
      scope: 'oob',
    },
  },
  {
    ...moderado,
    password: 'senha123',
    data: {
      access_token: moderado.access_token.replace('Bearer ', ''),
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: '077e7d7b-3114-457c-80d4-92221570042e',
      scope: 'oob',
    },
  },
  {
    ...arrojado,
    password: 'senha123',
    data: {
      access_token: arrojado.access_token.replace('Bearer ', ''),
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'bb4073d8-4dce-4861-910e-9a48ec20dab8',
      scope: 'oob',
    },
  },
];
