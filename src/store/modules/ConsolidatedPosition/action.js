import { Types } from './types'

export function GetConsolidatedPositionDataRequest(payload) {
  return {
    type: Types.GET_REQUEST,
    payload,
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
