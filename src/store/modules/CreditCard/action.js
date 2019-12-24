import { Types } from './types'

export function GetDataRequest(payload) {
  return {
    type: Types.GET_REQUEST,
    payload,
  }
}

export function GetDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
