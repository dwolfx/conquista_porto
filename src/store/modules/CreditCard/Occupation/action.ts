import { Types, IResponse } from './types'

export function GetCreditCardOccupationRequest() {
  return {
    type: Types.CREDIT_CARD_OCCUPATION_REQUEST,
  }
}

export function GetCreditCardOccupationSuccess(payload: IResponse) {
  return {
    type: Types.CREDIT_CARD_OCCUPATION_SUCCESS,
    payload,
  }
}

export function GetCreditCardOccupationFailure() {
  return {
    type: Types.CREDIT_CARD_OCCUPATION_FAILURE,
    payload: {
      profissoesVO: []
    }
  }
}



