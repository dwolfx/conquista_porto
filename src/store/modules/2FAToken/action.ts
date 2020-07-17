import { Types } from './types'
import { IToast } from 'hooks/toast'

export function Post2FATokenDataRequest(
  type: 'email_otp' | 'sms_otp',
  addToast?: (toast: Omit<IToast, 'id'>) => void
) {
  return {
    type: Types.POST_REQUEST,
    payload: {
      type,
      addToast,
    },
  }
}

export function Post2FATokenDataSuccess() {
  return {
    type: Types.POST_SUCCESS,
  }
}

export function Post2FATokenDataFailure() {
  return {
    type: Types.POST_FAILURE,
  }
}

export function Put2FATokenDataRequest(payload: string) {
  return {
    type: Types.PUT_REQUEST,
    payload,
  }
}

export function Put2FATokenDataSuccess() {
  return {
    type: Types.PUT_SUCCESS,
  }
}

export function Put2FATokenDataFailure() {
  return {
    type: Types.PUT_FAILURE,
  }
}

export function Get2FADataRequest() {
  return {
    type: Types.GET_PERSONALDATA_REQUEST,
  }
}

export function Get2FADataSuccess(payload: any) {
  return {
    type: Types.GET_PERSONALDATA_SUCCESS,
    payload,
  }
}

export function Get2FADataFailure() {
  return {
    type: Types.GET_PERSONALDATA_FAILURE,
  }
}
