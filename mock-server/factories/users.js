const faker = require('faker');

faker.locale = 'pt_BR';

const data = { users: [] };

for (let i = 1000; i < 1100; i++) {
  data.users.push({
    cep: faker.address.zipCode(),
    codigoEstadoCivil: 1,
    cpfCnpj: faker.random.number({ min: 11111111111, max: 99999999999 }),
    dataExpedicao: faker.date.past(),
    dataNascimento: faker.date.past(),
    dddNumeroTelefone: faker.random.number({ min: 11, max: 99 }),
    emailCliente: faker.internet.email(),
    estado: faker.address.stateAbbr(),
    message: {
      mensagem: 'SUCESSO',
      tipoCritica: 'SUCESSO',
    },
    nomeCliente: faker.name.findName(),
    nomeMae: faker.name.findName(),
    numeroDocumento: faker.random.number({ min: 111111111, max: 999999999 }),
    numeroEnderecoResidencial: 321,
    numeroTelefone: faker.phone.phoneNumber(),
    orgaoEmissor: 'DETRAN',
    sexo: faker.helpers.randomize(['M', 'F']),
    tipoDocumento: 'CNH',
  });
}

module.exports = data;
