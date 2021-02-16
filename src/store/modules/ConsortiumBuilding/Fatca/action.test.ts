import { Types } from './types'
import { GetFatcaRequest, GetFatcaSuccess, GetFatcaFailure } from './action'

describe('Consortium Building Fatca Actions', () => {
  test('if GetFatcaRequest returns the correct object', () => {
    expect(GetFatcaRequest()).toEqual({
      type: Types.GET_FATCA_REQUEST,
    })
  })

  test('if GetFatcaSuccess returns the correct object', () => {
    const payload = {}

    expect(GetFatcaSuccess(payload)).toEqual({
      type: Types.GET_FATCA_SUCCESS,
      payload,
    })
  })

  test('if GetFatcaFailure returns the correct object', () => {
    expect(GetFatcaFailure()).toEqual({
      type: Types.GET_FATCA_FAILURE,
    })
  })
})
