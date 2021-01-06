import { Types } from './types'
import {
  GetTripInsuranceCreditCardRequest,
  GetTripInsuranceCreditCardSuccess,
  GetTripInsuranceCreditCardFailure,
} from './action'

describe('Trip Insurance credit card Actions', () => {
  test('if GetTripInsuranceCreditCardRequest returns the correct object', () => {
    expect(GetTripInsuranceCreditCardRequest()).toEqual({
      type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST,
    })
  })

  test('if GetTripInsuranceCreditCardSuccess returns the correct object', () => {
    const payload = {}

    expect(GetTripInsuranceCreditCardSuccess(payload)).toEqual({
      type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_SUCCESS,
      payload,
    })
  })

  test('if GetTripInsuranceCreditCardFailure returns the correct object', () => {
    expect(GetTripInsuranceCreditCardFailure()).toEqual({
      type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_FAILURE,
    })
  })
})
