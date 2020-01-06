import { Types } from './types'

export function GetVehicleFinancingDataRequest(payload) {
  return {
    type: Types.GET_REQUEST,
    payload,
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
