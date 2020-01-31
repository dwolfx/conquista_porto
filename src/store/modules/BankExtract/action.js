import { Types } from './types'

export function GetBankExtractRequest(payload, cpf) {
  return {
    type: Types.GET_REQUEST,
    payload,
    cpf,
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
