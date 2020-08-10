import { Types } from './types'

export function GetCreditCardDataRequest() {
  return {
    type: Types.GET_REQUEST,
  }
}

export function GetCreditCardDataSuccess(payload: any) {
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
