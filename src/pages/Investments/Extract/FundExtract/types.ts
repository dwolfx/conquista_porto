import moment from 'moment'

export interface ISelectedExtractFundFilter {
  idFundo: number
  tipoFiltro?: number
  dataInicial?: moment.Moment | null
  dataFinal?: moment.Moment | null
}

export interface ITransaction {
  tipo: string
  data: string
  valor: string
}

export interface IFundExtractFilter {
  apply: boolean
  redeem: boolean
  quotaEater: boolean
  others: boolean
}
