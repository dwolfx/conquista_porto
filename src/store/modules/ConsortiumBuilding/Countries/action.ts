import { Types, ICountriesConsortiumBuilding } from './types'

export function GetCountriesRequest() {
  return {
    type: Types.GET_COUNTRIES_REQUEST,
  }
}

export function GetCountriesSuccess(payload: ICountriesConsortiumBuilding) {
  return {
    type: Types.GET_COUNTRIES_SUCCESS,
    payload,
  }
}

export function GetCountriesFailure() {
  return {
    type: Types.GET_COUNTRIES_FAILURE,
  }
}
