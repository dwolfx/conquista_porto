import { Types } from './types'

export function PostObjectiveManagementDataRequest({ id, pushHistory }) {
  return {
    type: Types.POST_REQUEST,
    payload: id,
    pushHistory,
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
