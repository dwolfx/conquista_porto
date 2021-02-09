export const Types = {
  GET_REQUEST: 'CONTEMPLATED_INTERVAL_GET_REQUEST',
  GET_SUCCESS: 'CONTEMPLATED_INTERVAL_GET_SUCCESS',
  GET_FAILURE: 'CONTEMPLATED_INTERVAL_GET_FAILURE',
}

export interface InitialState {
  status: string
  data: IContemplatedData | null
  isLoading: boolean
  hasError: boolean
}

export interface IContemplatedData {
  codigo_produto: number
  valor_minimo_parcela: number
  valor_maximo_parcela: number
  valor_minimo_credito: number
  valor_maximo_credito: number
}

export interface IGetRequest {
  type: string
  code: number
}

export interface ISuccess {
  data: IContemplatedData
}
