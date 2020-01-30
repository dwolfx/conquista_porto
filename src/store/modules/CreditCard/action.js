import { Types } from './types'

export function GetCreditCardDataRequest(cpf, token) {
  return {
    type: Types.GET_REQUEST,
    cpf,
    token,
  }
}

export function GetCreditCardDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetCreditCardDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
