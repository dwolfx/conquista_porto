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
    payload: id,
  }
}

export function PostSaveFundsSuccess() {
  return {
    type: Types.POST_SAVE_FUNDS_SUCCESS,
  }
}

export function PostSaveFundsFailure() {
  return {
    type: Types.POST_SAVE_FUNDS_FAILURE,
  }
}

export function GetObjectiveManagementDataRequest(payload) {
  return {
    type: Types.GET_REQUEST,
    ...payload,
  }
}

export function GetObjectiveManagementDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetObjectiveManagementDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
