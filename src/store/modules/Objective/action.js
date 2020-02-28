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

export function PostObjectiveDataRequest(payload, isMobile) {
  return {
    type: Types.POST_REQUEST,
    payload,
    isMobile,
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
