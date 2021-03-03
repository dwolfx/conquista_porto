import { Types } from './types'
import {
  PostTripInsuranceProposalRequest,
  PostTripInsuranceProposalSuccess,
  PostTripInsuranceProposalFailure,
} from './action'

describe('Trip insurance proposal actions', () => {
  test('if PostTripInsuranceProposalRequest returns the correct object', () => {
    const payload = {}
    const addToast = () => {}
    const onSuccess = () => {}
    const Step = undefined
    const setRetries = () => {}

    expect(
      PostTripInsuranceProposalRequest({
        payload,
        onErrorToast: addToast,
        onSuccess,
        Step,
        setRetries,
      })
    ).toEqual({
      type: Types.POST_TRIP_INSURANCE_PROPOSAL_REQUEST,
      payload,
      onErrorToast: addToast,
      onSuccess,
      Step,
      setRetries,
    })
  })

  test('if PostTripInsuranceProposalSuccess returns the correct object', () => {
    const payload = {}

    expect(PostTripInsuranceProposalSuccess(payload)).toEqual({
      type: Types.POST_TRIP_INSURANCE_PROPOSAL_SUCCESS,
      payload,
    })
  })

  test('if PostTripInsuranceProposalFailure returns the correct object', () => {
    expect(PostTripInsuranceProposalFailure()).toEqual({
      type: Types.POST_TRIP_INSURANCE_PROPOSAL_FAILURE,
    })
  })
})
