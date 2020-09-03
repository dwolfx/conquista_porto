import { Types } from './types'
import { IAutoConsortium } from './iConsortiumVehicle'

export function GetConsortiumVehicleDataRequest(cpf: string) {
  return {
    type: Types.GET_REQUEST,
    cpf,
  }
}

export function GetConsortiumVehicleDataSuccess(payload: IAutoConsortium[]) {
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
