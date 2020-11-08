export interface IFundExtractFilter {
  applyFund: boolean
  linkObjective: boolean
  redeemFund: boolean
  delinkObjective: boolean
  transferBetweenObjectives: boolean
}

export interface IInterval {
  initialDate: string
  finalDate: string
}

export interface ITransaction {
  tipo: string
  data: string
  valor: string
}

export interface ISelectInterval {
  id: number
  name: string
  value: number | null
}

export interface IAllocationType {
  id: number
  name: string
}
