const { conservador, moderado, arrojado } = require('../tokens');

// TODO: Provavelmente teria um dado especifico pra perfil
const _clienteCadastrado = {
  cep: '0918919',
  codigoEstadoCivil: 1,
  cpfCnpj: '00000000191',
  dataExpedicao: '2017-01-17T00:00:00-03:00',
  dataNascimento: '1987-11-25T00:00:00-03:00',
  dddNumeroTelefone: 11,
  emailCliente: 'blablabla@whiskas.com',
  estado: 'SP',
  message: {
    mensagem: 'SUCESSO',
    tipoCritica: 'SUCESSO',
  },
  nomeCliente: 'Naruto Uzumaki',
  nomeMae: 'Kushina Uzumaki',
  numeroDocumento: 999999999,
  numeroEnderecoResidencial: 321,
  numeroTelefone: 40028922,
  orgaoEmissor: 'DETRAN',
  sexo: 'M',
  tipoDocumento: 'CNH',
};

module.exports = [
  {
    ...conservador,
    data: _clienteCadastrado,
  },
  {
    ...moderado,
    data: null,
  },
  {
    ...arrojado,
    data: null,
  },
];
