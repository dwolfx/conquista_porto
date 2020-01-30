import { Types } from './types'

export function GetConsolidatedPositionDataRequest(cpf, token) {
  return {
    type: Types.GET_REQUEST,
    cpf,
    token,
  }
}

export function GetConsolidatedPositionDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetConsolidatedPositionDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
