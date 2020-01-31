import { Types } from './types'

export function PostObjectiveDataRequest(payload) {
  return {
    type: Types.POST_REQUEST,
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
