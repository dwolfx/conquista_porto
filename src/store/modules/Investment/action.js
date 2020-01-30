import { Types } from './types'

export function GetInvestmentListRequest(token) {
  return {
    type: Types.INVESTMENT_LIST_ADD_REQUEST,
    token,
  }
}

export function GetInvestmentListSuccess(payload) {
  return {
    type: Types.INVESTMENT_LIST_ADD_SUCCESS,
    payload,
  }
}

export function GetInvestmentListFailure() {
  return {
    type: Types.INVESTMENT_LIST_ADD_FAILURE,
  }
}
