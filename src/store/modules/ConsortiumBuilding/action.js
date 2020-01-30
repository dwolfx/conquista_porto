import { Types } from './types'

export function GetConsortiumBuildingDataRequest(cpf, token) {
  return {
    type: Types.GET_REQUEST,
    cpf,
    token,
  }
}

export function GetConsortiumBuildingDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetConsortiumBuildingDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
