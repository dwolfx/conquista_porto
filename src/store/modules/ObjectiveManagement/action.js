import { Types } from './types'

export function PostObjectiveManagementDataRequest(payload) {
  return {
    type: Types.POST_REQUEST,
    payload,
  }
}

export function PostObjectiveManagementDataSuccess(payload) {
  return {
    type: Types.POST_SUCCESS,
    payload,
  }
}

export function PostObjectiveManagementDataFailure() {
  return {
    type: Types.POST_FAILURE,
  }
}
