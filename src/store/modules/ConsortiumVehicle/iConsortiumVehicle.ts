interface ICustomer {
  Sobrenome: string
  Nome: string
}

export interface IAutoConsortium {
  UrlProposta: string
  DescricaoBem: string
  ValorContratado: string
  Descricao: string
  ValorParcelaAtual: string
  StatusConsorcio: string
  QuantidadeParcelasContratadas: string
  ValorQuitacao: string
  QuantidadeParcelasPagas: string
  Marca: string
  Modelo: string
  Grupo: string
  Cota: string
  ValorPago: string
  PontosGanhos: string
}

export interface IConsortiumVehicle {
  cliente: ICustomer
  consorcios: IAutoConsortium[]
}
