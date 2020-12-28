import { Types, IPayload } from './types'

export function GetDestinationCountriesRequest() {
  return {
    type: Types.GET_DESTINATION_CONTRIES_REQUEST,
  }
}

export function GetDestinationCountriesSuccess(payload: IPayload) {
  return {
    type: Types.GET_DESTINATION_CONTRIES_SUCCESS,
    payload,
  }
}

export function GetDestinationCountriesFailure() {
  return {
    type: Types.GET_DESTINATION_CONTRIES_FAILURE,
  }
}
