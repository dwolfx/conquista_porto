import { Types, IPayload } from './types'

export function GetDestinationCountriesRequest() {
  return {
    type: Types.GET_DESTINATION_COUNTRIES_REQUEST,
  }
}

export function GetDestinationCountriesSuccess(payload: IPayload) {
  return {
    type: Types.GET_DESTINATION_COUNTRIES_SUCCESS,
    payload,
  }
}

export function GetDestinationCountriesFailure() {
  return {
    type: Types.GET_DESTINATION_COUNTRIES_FAILURE,
  }
}
