export interface IFilter {
  entry: boolean
  withdraw: boolean
}

export interface IInterval {
  startDate: string
  endDate: string
}

export interface ITransaction {
  tipo: string
  data: string
  valor: string
}

export interface ISelectInterval {
  id: number,
  name: string,
  value: number | null,
}
