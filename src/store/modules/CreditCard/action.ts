import { Types } from './types'
import { ICreditCard } from './iCreditCard'

export function GetCreditCardDataRequest() {
  return {
    type: Types.GET_REQUEST,
  }
}

export function GetCreditCardDataSuccess(payload: ICreditCard[]) {
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
