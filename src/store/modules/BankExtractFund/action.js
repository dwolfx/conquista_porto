import { Types } from './types'

export function GetBankExtractFundRequest(payload, cpf) {
  return {
    type: Types.GET_REQUEST,
    payload,
    cpf,
  }
}

export function GetBankExtractFundSuccess(payload) {
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
