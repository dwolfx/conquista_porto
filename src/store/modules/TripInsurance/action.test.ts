import { Types } from './types'
import {
  GetTripInsuranceDataRequest,
  GetTripInsuranceDataSuccess,
  GetTripInsuranceDataFailure,
} from './action'

describe('Trip Insurance Actions', () => {
  test('if GetTripInsuranceDataRequest returns the correct object', () => {
    expect(GetTripInsuranceDataRequest()).toEqual({
      type: Types.GET_DATA_REQUEST,
    })
  })

  test('if GetTripInsuranceDataSuccess returns the correct object', () => {
    const payload = {}

    expect(GetTripInsuranceDataSuccess(payload)).toEqual({
      type: Types.GET_DATA_SUCCESS,
      payload,
    })
  })

  test('if GetTripInsuranceDataFailure returns the correct object', () => {
    expect(GetTripInsuranceDataFailure()).toEqual({
      type: Types.GET_DATA_FAILURE,
    })
  })
})
