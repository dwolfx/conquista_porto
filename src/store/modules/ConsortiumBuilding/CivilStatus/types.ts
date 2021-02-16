export const Types = {
  GET_CIVIL_STATUS_REQUEST: 'GET_CIVIL_STATUS_REQUEST',
  GET_CIVIL_STATUS_SUCCESS: 'GET_CIVIL_STATUS_SUCCESS',
  GET_CIVIL_STATUS_FAILURE: 'GET_CIVIL_STATUS_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: ICivilStatusConsortiumBuilding
}

export interface ICivilStatus {
  codigo: string
  descricao: string
}

export interface ICivilStatusConsortiumBuilding {
  estados_civis: ICivilStatus[]
}

export interface ICivilStatusConsortiumBuildingState {
  readonly data: ICivilStatusConsortiumBuilding | null
  readonly isLoading: boolean
  readonly hasError: boolean
}
