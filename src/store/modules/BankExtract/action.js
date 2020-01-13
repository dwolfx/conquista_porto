import { Types } from './types'

export function GetBankExtractRequest(payload) {
  return {
    type: Types.GET_REQUEST,
    payload,
  }
}

export function GetBankExtractSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetBankExtractFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
