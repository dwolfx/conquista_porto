import { Types } from './types'

export function GetDataRequest() {
  return {
    type: Types.INVESTMENT_LIST_ADD_REQUEST,
  }
}

export function GetDataSuccess(payload) {
  return {
    type: Types.INVESTMENT_LIST_ADD_SUCCESS,
    payload,
  }
}

export function GetDataFailure() {
  return {
    type: Types.INVESTMENT_LIST_ADD_FAILURE,
  }
}
