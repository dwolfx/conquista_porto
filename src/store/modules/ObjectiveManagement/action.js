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

export function PostSaveFundsRequest(id) {
  return {
    type: Types.POST_SAVE_FUNDS_REQUEST,
    fundId: id,
  }
}

export function PostSaveFundsSuccess(payload) {
  return {
    type: Types.POST_SAVE_FUNDS_SUCCESS,
    payload,
  }
}

export function PostSaveFundsFailure() {
  return {
    type: Types.POST_SAVE_FUNDS_FAILURE,
  }
}
