import { Types, ICreditCardExpirationDays } from './types'

export function GetCreditCardExpirationDaysRequest() {
  return {
    type: Types.CREDIT_CARD_EXPIRATION_DAYS_REQUEST,
  }
}

export function GetCreditCardExpirationDaysSuccess(payload: ICreditCardExpirationDays) {
  return {
    type: Types.CREDIT_CARD_EXPIRATION_DAYS_SUCCESS,
    payload,
  }
}

export function GetCreditCardExpirationDaysFailure() {
  return {
    type: Types.CREDIT_CARD_EXPIRATION_DAYS_FAILURE,
  }
}

export function GetCreditCardExpirationDaysClearData() {
  return {
    type: Types.CREDIT_CARD_EXPIRATION_DAYS_CLEAR_DATA,
  }
}


