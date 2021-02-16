export const Types = {
  GET_FATCA_REQUEST: 'GET_FATCA_REQUEST',
  GET_FATCA_SUCCESS: 'GET_FATCA_SUCCESS',
  GET_FATCA_FAILURE: 'GET_FATCA_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: IFatcaConsortiumBuilding
}

export interface IFatca {
  codigo: string
  descricao: string
}

export interface IFatcaConsortiumBuilding {
  lista_fatca: IFatca[]
}

export interface IFatcaConsortiumBuildingState {
  readonly data: IFatcaConsortiumBuilding | null
  readonly isLoading: boolean
  readonly hasError: boolean
}
