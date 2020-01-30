import { Types } from './types'

export function GetPositionDataRequest(cpf, token) {
  return {
    type: Types.ADD_REQUEST,
    cpf,
    token,
  }
}

export function GetPositionDataSuccess(payload) {
  return {
    type: Types.ADD_SUCCESS,
    payload,
  }
}

export function GetPositionDataFailure() {
  return {
    type: Types.ADD_FAILURE,
  }
}
