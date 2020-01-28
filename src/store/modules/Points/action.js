import { Types } from './types'

export function GetPointsDataRequest(cpf) {
  return {
    type: Types.GET_REQUEST,
    cpf,
  }
}

export function GetPointsDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetPointsDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
