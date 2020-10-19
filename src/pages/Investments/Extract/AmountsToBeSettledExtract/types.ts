export interface IFilter {
  application: boolean
  redeem: boolean
}

export interface IInterval {
  startDate: string
  endDate: string
}

export interface ITransaction {
  nome: string
  tipo: string
  data: string
  valor: string
}

export interface ISelectInterval {
  id: number
  name: string
  value: number | null
}
