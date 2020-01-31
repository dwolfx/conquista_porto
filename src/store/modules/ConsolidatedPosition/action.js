import { Types } from './types'

export function GetConsolidatedPositionDataRequest(cpf) {
  return {
    type: Types.GET_REQUEST,
    cpf,
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
