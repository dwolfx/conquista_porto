import { Types } from './types'

export function GetConsortiumVehicleDataRequest(cpf) {
  return {
    type: Types.GET_REQUEST,
    cpf,
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
