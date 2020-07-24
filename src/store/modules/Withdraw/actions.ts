import { Types, ISummartPayload, IDetailsPayload } from './types'

export function GetWithdrawDetailsRequest(payload?: IDetailsPayload) {
  return {
    type: Types.GET_WITHDRAW_DETAILS_REQUEST,
    payload,
  }
}

export function GetWithdrawDetailsSuccess(payload: any) {
  return {
    type: Types.GET_WITHDRAW_DETAILS_SUCCESS,
    payload,
  }
}

export function GetWithdrawDetailsFailure() {
  return {
    type: Types.GET_WITHDRAW_DETAILS_FAILURE,
  }
}

export function GetWithdrawSummaryRequest(
  payload: Pick<ISummartPayload, 'data'>
) {
  return {
    type: Types.GET_WITHDRAW_SUMMARY_REQUEST,
    payload,
  }
}

export function GetWithdrawSummarySuccess(payload: any) {
  return {
    type: Types.GET_WITHDRAW_SUMMARY_SUCCESS,
    payload,
  }
}

export function GetWithdrawSummaryFailure() {
  return {
    type: Types.GET_WITHDRAW_SUMMARY_FAILURE,
  }
}
