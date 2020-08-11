import { Types } from './types'
import {
  GetRewardTypesRequest,
  GetRewardTypesSuccess,
  GetRewardTypesFailure,
} from './action'

describe('Rewards - Types actions', () => {
  test('if GetRewardTypesRequest returns the correct object', () => {
    expect(GetRewardTypesRequest()).toEqual({
      type: Types.GET_TYPES_REQUEST,
    })
  })

  test('if GetRewardTypesSuccess returns the correct object', () => {
    const payload = {}
    expect(GetRewardTypesSuccess(payload)).toEqual({
      type: Types.GET_TYPES_SUCCESS,
      payload,
    })
  })

  test('if GetRewardTypesFailure returns the correct object', () => {
    expect(GetRewardTypesFailure()).toEqual({
      type: Types.GET_TYPES_FAILURE,
    })
  })
})
