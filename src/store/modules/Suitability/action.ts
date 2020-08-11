import { Types } from './types'

export function GetSuitabilityRequestAndRedirect(payload: any) {
  return {
    type: Types.GET_REQUEST_AND_REDIRECT,
    payload,
  }
}

export function GetSuitabilityDataSuccess(payload: any) {
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

export function SetSuitabilityLoading(isLoading: boolean) {
  return {
    type: Types.SET_LOADING,
    isLoading,
  }
}

export function GetSuitabilityDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
