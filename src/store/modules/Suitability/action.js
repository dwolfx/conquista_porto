import { Types } from './types'

export function GetSuitabilityRequestAndRedirect(cpf, link, history) {
  return {
    type: Types.GET_REQUEST_AND_REDIRECT,
    cpf,
    link,
    history,
  }
}

export function GetSuitabilityDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetSuitabilityDataNoContent() {
  return {
    type: Types.GET_NO_CONTENT,
  }
}

export function SetSuitabilityLoading() {
  return {
    type: Types.SET_LOADING,
    isLoading: true,
  }
}

export function GetSuitabilityDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
