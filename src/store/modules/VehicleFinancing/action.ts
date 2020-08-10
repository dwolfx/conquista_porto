import { Types } from './types'

export function GetVehicleFinancingDataRequest() {
  return {
    type: Types.GET_REQUEST,
  }
}

export function GetVehicleFinancingSuccess(payload: any) {
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
