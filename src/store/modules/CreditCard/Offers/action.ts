import { Types, ICreditCardOffer, ICreditCardOfferRequest } from './types'

export function GetCreditCardOfferRequest(
  payload: Omit<ICreditCardOfferRequest, 'type'>
) {
  return {
    ...payload,
    type: Types.GET_CREDIT_CARD_OFFERS_REQUEST,
  }
}

export function GetCreditCardOfferSuccess(payload: ICreditCardOffer) {
  return {
    type: Types.GET_CREDIT_CARD_OFFERS_SUCCESS,
    payload,
  }
}

export function GetCreditCardOfferFailure() {
  return {
    type: Types.GET_CREDIT_CARD_OFFERS_FAILURE,
  }
}
