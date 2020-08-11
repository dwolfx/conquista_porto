import { Types } from './types'
import {
  GetLifeInsuranceDataRequest,
  GetLifeInsuranceDataSuccess,
  GetLifeInsuranceDataFailure,
} from './action'

describe('Life Insurance Actions', () => {
  test('if GetLifeInsuranceDataRequest returns the correct object', () => {
    expect(GetLifeInsuranceDataRequest()).toEqual({
      type: Types.GET_DATA_REQUEST,
    })
  })

  test('if GetLifeInsuranceDataSuccess returns the correct object', () => {
    const payload = {}

    expect(GetLifeInsuranceDataSuccess(payload)).toEqual({
      type: Types.GET_DATA_SUCCESS,
      payload,
    })
  })

  test('if GetLifeInsuranceDataFailure returns the correct object', () => {
    expect(GetLifeInsuranceDataFailure()).toEqual({
      type: Types.GET_DATA_FAILURE,
    })
  })
})
