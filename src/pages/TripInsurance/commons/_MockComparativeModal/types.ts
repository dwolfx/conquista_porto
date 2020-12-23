export interface ITravelCoverage {
  descricao: string
  valor: string
}

export interface ITravelPlans {
  nomePlano: string
  viagemCobertura: ITravelCoverage[]
}
