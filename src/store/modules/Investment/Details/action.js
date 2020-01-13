import { Types } from './types'

export function GetInvestmentDetailsRequest(id) {
  return {
    type: Types.INVESTMENT_DETAILS_ADD_REQUEST,
    fundId: id,
  }
}

export function GetInvestmentDetailsSuccess(payload) {
  return {
    type: Types.INVESTMENT_DETAILS_ADD_SUCCESS,
    payload,
  }
}

export function GetInvestmentDetailsFailure() {
  return {
    type: Types.INVESTMENT_DETAILS_ADD_FAILURE,
  }
}
