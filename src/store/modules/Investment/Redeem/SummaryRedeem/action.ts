import { Types, IGetRedeemSummaryRequest } from './types'
import { IError } from './types'

export function GetRedeemSummaryRequest(payload: IGetRedeemSummaryRequest) {
  return {
    type: Types.REDEEM_SUMMARY_GET_DATA_REQUEST,
    payload
  }
}

export function GetRedeemSummarySuccess(response: any) {
  return {
    type: Types.REDEEM_SUMMARY_GET_DATA_SUCCESS,
    payload: response
  }
}

export function GetRedeemSummaryFailure({ message }: IError) {
  return {
    type: Types.REDEEM_SUMMARY_GET_DATA_FAILURE,
    message
  }
}

export function ClearReddemSummary() {
  return {
    type: Types.REDDEM_SUMMARY_CLEAR_DATA
  }
}