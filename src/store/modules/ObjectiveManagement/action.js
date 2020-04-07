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

export function PostSaveFundsRequest(payload) {
  return {
    type: Types.POST_SAVE_FUNDS_REQUEST,
    payload,
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

export function GetOtherGoalsDataRequest(payload) {
  return {
    type: Types.GET_OTHER_GOALS_REQUEST,
    ...payload,
  }
}

export function GetOtherGoalsDataSuccess(payload) {
  return {
    type: Types.GET_OTHER_GOALS_SUCCESS,
    payload,
  }
}

export function GetOtherGoalsDataFailure() {
  return {
    type: Types.GET_OTHER_GOALS_FAILURE,
  }
}

export function DeleteObjectiveRequest(id, pushHistoryToHomeScreen) {
  return {
    type: Types.DELETE_REQUEST,
    payload: { id, pushHistoryToHomeScreen },
  }
}

export function DeleteObjectiveSuccess(payload) {
  return {
    type: Types.DELETE_SUCCESS,
    payload,
  }
}

export function DeleteObjectiveFailure() {
  return {
    type: Types.DELETE_FAILURE,
  }
}

export function CleanObjectiveManagementData() {
  return {
    type: Types.CLEAN_DATA,
  }
}
