const faker = require('faker');

faker.locale = 'pt_BR';

const data = { users: [] };

for (let i = 1000; i < 1100; i++) {
  data.users.push({
    emailCliente: faker.internet.email(),
    estado: 'SP',
    Message: {
      TipoCritica: 'SUCESSO',
      Mensagem: 'SUCESSO',
    },
    numeroEnderecoResidencial: '11',
    numeroTelefone: faker.phone.phoneNumber(),
    cpfCnpj: faker.random.number({ min: 11111111111, max: 99999999999 }),
    dddNumeroTelefone: faker.random.number({ min: 11, max: 99 }),
    nomeCliente: faker.name.findName(),
    dataNascimento: faker.date.past(),
    cep: faker.random.number({ min: 11111111, max: 99999999 }),
  });
}

module.exports = data;
