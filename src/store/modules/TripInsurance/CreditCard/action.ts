import { Types, IPayload, IGetCreditCardsRequestPayload } from './types'

export function GetTripInsuranceCreditCardRequest({
  onErrorToast,
  onSuccess,
  Step,
}: IGetCreditCardsRequestPayload) {
  return {
    type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST,
    onSuccess,
    Step,
    onErrorToast,
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
