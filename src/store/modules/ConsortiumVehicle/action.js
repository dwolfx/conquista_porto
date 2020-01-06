import { Types } from './types'

export function GetConsortiumVehicleDataRequest(payload) {
  return {
    type: Types.GET_REQUEST,
    payload,
  }
}

export function GetConsortiumVehicleDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetConsortiumVehicleDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
