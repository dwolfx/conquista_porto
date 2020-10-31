import {
  Types,
  ICreditCard,
  ICreditCardClientData,
  ICreditCardClientDataRequest,
} from './types'

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

export function GetCreditCardClientDataRequest(
  payload: Omit<ICreditCardClientDataRequest, 'type'>
) {
  return {
    type: Types.GET_CLIENT_DATA_REQUEST,
    ...payload,
  }
}

export function GetCreditCardClientDataSuccess(payload: ICreditCardClientData) {
  return {
    type: Types.GET_CLIENT_DATA_SUCCESS,
    payload,
  }
}

export function GetCreditCardClientDataFailure() {
  return {
    type: Types.GET_CLIENT_DATA_FAILURE,
  }
}
