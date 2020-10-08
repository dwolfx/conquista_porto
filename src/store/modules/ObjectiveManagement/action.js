import { Types } from './types'

export function PostObjectiveManagementDataRequest({
  data,
  pushHistory,
  onSuccess,
  onError,
  addToast,
}) {
  return {
    type: Types.POST_REQUEST,
    data,
    pushHistory,
    onSuccess,
    onError,
    addToast,
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

export function PutSaveFundsRequest(payload) {
  return {
    type: Types.PUT_SAVE_FUNDS_REQUEST,
    payload,
  }
}

export function PutSaveFundsSuccess(payload) {
  return {
    type: Types.PUT_SAVE_FUNDS_SUCCESS,
    payload,
  }
}

export function PutSaveFundsFailure() {
  return {
    type: Types.PUT_SAVE_FUNDS_FAILURE,
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

export function DeleteObjectiveRequest(id, pushHistoryToHomeScreen, addToast) {
  return {
    type: Types.DELETE_REQUEST,
    payload: { id, pushHistoryToHomeScreen, addToast },
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

export function UpdateObjectiveNicknameRequest(payload) {
  return {
    type: Types.UPDATE_OBJECTIVE_NICKNAME_REQUEST,
    payload,
  }
}

export function UpdateObjectiveNicknameSuccess(payload) {
  return {
    type: Types.UPDATE_OBJECTIVE_NICKNAME_SUCCESS,
    payload,
  }
}

export function UpdateObjectiveNicknameFailure() {
  return {
    type: Types.UPDATE_OBJECTIVE_NICKNAME_FAILURE,
  }
}
