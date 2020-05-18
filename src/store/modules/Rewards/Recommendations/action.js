import { Types } from './types'

export function GetRewardRecommendationsRequest() {
  return {
    type: Types.GET_RECOMMENDATIONS_REQUEST,
  }
}

export function GetRewardRecommendationsSuccess(payload) {
  return {
    type: Types.GET_RECOMMENDATIONS_SUCCESS,
    payload,
  }
}

export function GetRewardRecommendationsFailure() {
  return {
    type: Types.GET_RECOMMENDATIONS_FAILURE,
  }
}
