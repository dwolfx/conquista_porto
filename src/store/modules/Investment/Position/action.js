import { Types } from './types'

export function GetPositionDataRequest() {
  return {
    type: Types.ADD_REQUEST,
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
