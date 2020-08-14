import { Types } from './types'
import {
  GetRewardRecommendationsRequest,
  GetRewardRecommendationsSuccess,
  GetRewardRecommendationsFailure,
} from './action'

describe('Rewards - Recommendations actions', () => {
  test('if GetRewardRecommendationsRequest returns the correct object', () => {
    expect(GetRewardRecommendationsRequest()).toEqual({
      type: Types.GET_RECOMMENDATIONS_REQUEST,
    })
  })

  test('if GetRewardRecommendationsSuccess returns the correct object', () => {
    const payload = {}
    expect(GetRewardRecommendationsSuccess(payload)).toEqual({
      type: Types.GET_RECOMMENDATIONS_SUCCESS,
      payload,
    })
  })

  test('if GetRewardRecommendationsFailure returns the correct object', () => {
    expect(GetRewardRecommendationsFailure()).toEqual({
      type: Types.GET_RECOMMENDATIONS_FAILURE,
    })
  })
})
