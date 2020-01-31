import { Types } from './types'

export function GetTripInsuranceDataRequest(cpf) {
  return {
    type: Types.GET_DATA_REQUEST,
    cpf,
  }
}

export function GetTripInsuranceDataSuccess(payload) {
  return {
    type: Types.GET_DATA_SUCCESS,
    payload,
  }
}

export function GetTripInsuranceDataFailure() {
  return {
    type: Types.GET_DATA_FAILURE,
  }
}
