import { Types } from './types'

export function GetVehicleFinancingDataRequest(cpf) {
  return {
    type: Types.GET_REQUEST,
    cpf,
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
