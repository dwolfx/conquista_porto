import { Types } from './types'

export function GetBankExtractFundRequest(payload: any) {
  return {
    type: Types.GET_REQUEST,
    payload,
  }
}

export function GetBankExtractFundSuccess(payload: any) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetBankExtractFundFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}

export function ClearBankExtractFundData() {
  return {
    type: Types.CLEAR_DATA,
  }
}

export function OpenBankExtractFundLayer() {
  return {
    type: Types.OPEN_LAYER_EXTRATO,
  }
}

export function CloseBankExtractFundLayer() {
  return {
    type: Types.CLOSE_LAYER_EXTRATO,
  }
}
