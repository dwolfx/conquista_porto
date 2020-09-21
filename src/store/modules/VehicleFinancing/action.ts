import { Types } from './types'
import { IVehicleFinancing } from './iVehicleFinancing'

export function GetVehicleFinancingDataRequest() {
  return {
    type: Types.GET_REQUEST,
  }
}

export function GetVehicleFinancingSuccess(payload: IVehicleFinancing[]) {
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
