export const Types = {
  GET_COUNTRIES_REQUEST: 'GET_COUNTRIES_REQUEST',
  GET_COUNTRIES_SUCCESS: 'GET_COUNTRIES_SUCCESS',
  GET_COUNTRIES_FAILURE: 'GET_COUNTRIES_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: ICountriesConsortiumBuilding
}

export interface ICountries {
  codigo: string
  descricao: string
}

export interface ICountriesConsortiumBuilding {
  paises: ICountries[]
}

export interface ICountriesConsortiumBuildingState {
  readonly data: ICountriesConsortiumBuilding | null
  readonly isLoading: boolean
  readonly hasError: boolean
}
