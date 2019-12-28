import { Types } from './types'

export function GetDataRequest(id) {
  return {
    type: Types.INVESTMENT_DETAILS_ADD_REQUEST,
    fundId: id,
  }
}

export function GetDataSuccess(payload) {
  return {
    type: Types.INVESTMENT_DETAILS_ADD_SUCCESS,
    payload,
  }
}

export function GetDataFailure() {
  return {
    type: Types.INVESTMENT_DETAILS_ADD_FAILURE,
  }
}
