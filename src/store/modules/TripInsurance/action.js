import { Types } from './types'

export function GetDataRequest() {
  return {
    type: Types.GET_DATA_REQUEST,
  }
}

export function GetDataSuccess(payload) {
  return {
    type: Types.GET_DATA_SUCCESS,
    payload,
  }
}

export function GetDataFailure() {
  return {
    type: Types.GET_DATA_FAILURE,
  }
}
