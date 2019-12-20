import { Types } from './types'

export function GetDataRequest(payload) {
  return {
    type: Types.ADD_REQUEST,
    payload,
  }
}

export function GetDataSuccess(payload) {
  return {
    type: Types.ADD_SUCCESS,
    payload,
  }
}

export function GetDataFailure() {
  return {
    type: Types.ADD_FAILURE,
  }
}
