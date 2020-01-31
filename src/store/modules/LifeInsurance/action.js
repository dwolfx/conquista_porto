import { Types } from './types'

export function GetLifeInsuranceDataRequest(cpf) {
  return {
    type: Types.GET_DATA_REQUEST,
    cpf,
  }
}

export function GetLifeInsuranceDataSuccess(payload) {
  return {
    type: Types.GET_DATA_SUCCESS,
    payload,
  }
}

export function GetLifeInsuranceDataFailure() {
  return {
    type: Types.GET_DATA_FAILURE,
  }
}
