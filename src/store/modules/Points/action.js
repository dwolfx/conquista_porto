import { Types } from './types'

export function GetPointsExtractRequest(cpf) {
  return {
    type: Types.GET_EXTRACT_REQUEST,
    cpf,
  }
}

export function GetPointsExtractSuccess(payload) {
  return {
    type: Types.GET_EXTRACT_SUCCESS,
    payload,
  }
}

export function GetPointsExtractFailure() {
  return {
    type: Types.GET_EXTRACT_FAILURE,
  }
}

export function GetPointsBalanceRequest(cpf) {
  return {
    type: Types.GET_BALANCE_REQUEST,
    cpf,
  }
}

export function GetPointsBalanceSuccess(payload) {
  return {
    type: Types.GET_BALANCE_SUCCESS,
    payload,
  }
}

export function GetPointsBalanceFailure() {
  return {
    type: Types.GET_BALANCE_FAILURE,
  }
}

export function PostRecuePointsRequest({ onSuccess }) {
  return { type: Types.POST_RESCUE_POINTS_REQUEST, payload: { onSuccess } }
}
