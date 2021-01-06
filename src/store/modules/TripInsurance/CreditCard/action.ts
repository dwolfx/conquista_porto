import { Types, IPayload } from './types'

export function GetTripInsuranceCreditCardRequest() {
  return {
    type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST,
  }
}

export function GetTripInsuranceCreditCardSuccess(payload: IPayload) {
  return {
    type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_SUCCESS,
    payload,
  }
}

export function GetTripInsuranceCreditCardFailure() {
  return {
    type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_FAILURE,
  }
}
