import { Types } from './types'

export function GetInvestmentListRequest(payload) {
  return {
    type: Types.INVESTMENT_LIST_ADD_REQUEST,
    payload,
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
