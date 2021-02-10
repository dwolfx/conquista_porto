export interface ICreditCardRedis {
  bandeira: string,
  dataVencimento: string,
  enderecoRecebimento: {
    cep: string
    endereco: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
  }
}