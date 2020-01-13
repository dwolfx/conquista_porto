import { Types } from './types'

export function GetPointsDataRequest(payload) {
  return {
    type: Types.GET_REQUEST,
    payload,
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
