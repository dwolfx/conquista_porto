import { Types } from './types'
import {
  PostInsuranceQuotationRequest,
  PostInsuranceQuotationSuccess,
  PostInsuranceQuotationFailure,
} from './action'

describe('Trip Insurance credit card Actions', () => {
  test('if PostInsuranceQuotationRequest returns the correct object', () => {
    const payload = {}
    const addToast = () => {}
    const onSuccess = () => {}

    expect(
      PostInsuranceQuotationRequest({
        payload,
        onErrorToast: addToast,
        onSuccess,
      })
    ).toEqual({
      type: Types.POST_INSURANCE_QUOTATION_REQUEST,
      payload,
      onErrorToast: addToast,
      onSuccess,
    })
  })

  test('if PostInsuranceQuotationSuccess returns the correct object', () => {
    const payload = {}

    expect(PostInsuranceQuotationSuccess(payload)).toEqual({
      type: Types.POST_INSURANCE_QUOTATION_SUCCESS,
      payload,
    })
  })

  test('if PostInsuranceQuotationFailure returns the correct object', () => {
    expect(PostInsuranceQuotationFailure()).toEqual({
      type: Types.POST_INSURANCE_QUOTATION_FAILURE,
    })
  })
})
