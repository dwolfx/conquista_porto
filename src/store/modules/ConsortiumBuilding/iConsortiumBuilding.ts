interface ICustomer {
  cpf: string
}

export interface IConsortiumItem {
  Id: number
  UrlProposta: string
  DescricaoBem: string
  ValorContratado: string
  Descricao: string
  ValorParcelaAtual: string
  StatusConsorcio: string
  QuantidadeParcelasContratadas: string
  ValorQuitacao: string
  QuantidadeParcelasPagas: string
  Grupo: string
  Cota: string
  ValorPago: string
  PontosGanhos: string
}

export interface IConsortiumBuildings {
  Cliente: ICustomer
  consorcios: IConsortiumItem
}
