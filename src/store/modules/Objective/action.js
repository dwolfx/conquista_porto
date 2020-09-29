import { Types } from './types'

export function GetObjectiveDataRequest() {
  return {
    type: Types.GET_REQUEST,
  }
}

export function GetObjectiveDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetObjectiveDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}

export function PostObjectiveDataRequest(payload) {
  return {
    type: Types.POST_REQUEST,
    payload,
  }
}

export function PostObjectiveDataRequestBySimulate(payload) {
  return {
    type: Types.POST_REQUEST_BY_SIMULATE,
    payload,
  }
}

export function PostObjectiveDataSuccess(payload) {
  return {
    type: Types.POST_SUCCESS,
    payload,
  }
}

export function PostObjectiveDataFailure() {
  return {
    type: Types.POST_FAILURE,
  }
}

export function UpdateRecommendationRequest(payload) {
  return {
    type: Types.PUT_RECOMMENDATION_REQUEST,
    payload,
  }
}

export function UpdateRecommendationSuccess(payload) {
  return {
    type: Types.PUT_RECOMMENDATION_SUCCESS,
    payload,
  }
}

export function UpdateRecommendationFailure() {
  return {
    type: Types.PUT_RECOMMENDATION_FAILURE,
  }
}

export function PostRecalculateFundsRequest(payload) {
  return {
    type: Types.POST_RECALCULATE_FUNDS_REQUEST,
    payload,
  }
}

export function PostRecalculateFundsSuccess(payload) {
  return {
    type: Types.POST_RECALCULATE_FUNDS_SUCCESS,
    payload,
  }
}

export function PostRecalculateFundsFailure() {
  return {
    type: Types.POST_RECALCULATE_FUNDS_FAILURE,
  }
}

export function CleanObjectiveData() {
  return {
    type: Types.CLEAN_DATA,
  }
}
