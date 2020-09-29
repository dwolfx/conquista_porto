import { Types } from './types'
import {
  GetObjectiveDataRequest,
  GetObjectiveDataSuccess,
  GetObjectiveDataFailure,
  PostObjectiveDataRequest,
  PostObjectiveDataRequestBySimulate,
  PostObjectiveDataSuccess,
  PostObjectiveDataFailure,
  UpdateRecommendationRequest,
  UpdateRecommendationSuccess,
  UpdateRecommendationFailure,
  PostRecalculateFundsRequest,
  PostRecalculateFundsSuccess,
  PostRecalculateFundsFailure,
  CleanObjectiveData,
} from './action'

describe('Objective Actions', () => {
  test('if GetObjectiveDataRequest returns the correct object', () => {
    expect(GetObjectiveDataRequest()).toEqual({
      type: Types.GET_REQUEST,
    })
  })

  test('if GetObjectiveDataSuccess returns the correct object', () => {
    const payload = {}

    expect(GetObjectiveDataSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetObjectiveDataFailure returns the correct object', () => {
    expect(GetObjectiveDataFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })

  test('if PostObjectiveDataRequest returns the correct object', () => {
    expect(PostObjectiveDataRequest()).toEqual({
      type: Types.POST_REQUEST,
    })
  })

  test('if PostObjectiveDataRequestBySimulate returns the correct object', () => {
    expect(PostObjectiveDataRequestBySimulate()).toEqual({
      type: Types.POST_REQUEST_BY_SIMULATE,
    })
  })

  test('if PostObjectiveDataSuccess returns the correct object', () => {
    expect(PostObjectiveDataSuccess()).toEqual({
      type: Types.POST_SUCCESS,
    })
  })

  test('if PostObjectiveDataFailure returns the correct object', () => {
    expect(PostObjectiveDataFailure()).toEqual({
      type: Types.POST_FAILURE,
    })
  })
  test('if UpdateRecommendationRequest returns the correct object', () => {
    expect(UpdateRecommendationRequest()).toEqual({
      type: Types.PUT_RECOMMENDATION_REQUEST,
    })
  })

  test('if UpdateRecommendationSuccess returns the correct object', () => {
    expect(UpdateRecommendationSuccess()).toEqual({
      type: Types.PUT_RECOMMENDATION_SUCCESS,
    })
  })

  test('if UpdateRecommendationFailure returns the correct object', () => {
    expect(UpdateRecommendationFailure()).toEqual({
      type: Types.PUT_RECOMMENDATION_FAILURE,
    })
  })
  test('if PostRecalculateFundsRequest returns the correct object', () => {
    expect(PostRecalculateFundsRequest()).toEqual({
      type: Types.POST_RECALCULATE_FUNDS_REQUEST,
    })
  })

  test('if PostRecalculateFundsSuccess returns the correct object', () => {
    expect(PostRecalculateFundsSuccess()).toEqual({
      type: Types.POST_RECALCULATE_FUNDS_SUCCESS,
    })
  })

  test('if PostRecalculateFundsFailure returns the correct object', () => {
    expect(PostRecalculateFundsFailure()).toEqual({
      type: Types.POST_RECALCULATE_FUNDS_FAILURE,
    })
  })

  test('if CleanObjectiveData returns the correct object', () => {
    expect(CleanObjectiveData()).toEqual({
      type: Types.CLEAN_DATA,
    })
  })
})
