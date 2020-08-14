import { Types } from './types'

export function GetRewardTypesRequest() {
  return {
    type: Types.GET_TYPES_REQUEST,
  }
}

export function GetRewardTypesSuccess(payload: any) {
  return {
    type: Types.GET_TYPES_SUCCESS,
    payload,
  }
}

export function GetRewardTypesFailure() {
  return {
    type: Types.GET_TYPES_FAILURE,
  }
}
