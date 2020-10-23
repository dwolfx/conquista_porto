import { Types, ICreditCard } from './types'

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

export function OpenCreationLayer() {
  return {
    type: Types.OPEN_CREDIT_CARD_CREATION,
  }
}

export function CloseCreationLayer() {
  return {
    type: Types.CLOSE_CREDIT_CARD_CREATION,
  }
}
