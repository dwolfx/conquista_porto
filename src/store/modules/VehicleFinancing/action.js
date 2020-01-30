import { Types } from './types'

export function GetVehicleFinancingDataRequest(cpf, token) {
  return {
    type: Types.GET_REQUEST,
    cpf,
    token,
  }
}

export function GetVehicleFinancingSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetVehicleFinancingFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
