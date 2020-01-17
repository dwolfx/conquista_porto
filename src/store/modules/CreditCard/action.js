import { Types } from './types'

export function GetCreditCardDataRequest(payload) {
  return {
    type: Types.GET_REQUEST,
    payload,
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
