import { Types, IGeneratePayload } from './types'
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
    type: Types.VALIDATE_REQUEST,
    payload,
  }
}

export function Put2FATokenDataSuccess() {
  return {
    type: Types.VALIDATE_SUCCESS,
  }
}

export function Put2FATokenDataFailure() {
  return {
    type: Types.VALIDATE_FAILURE,
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

export function Run2FAInitialRequest(payload: IGeneratePayload) {
  return {
    type: Types.RUN_INITIAL_REQUEST,
    payload,
  }
}

export function ValidateTokenNSignature(payload: any) {
  return {
    type: Types.VALIDATE_TOKEN_SIGNATURE,
    payload,
  }
}

export function SaveToken(payload: {
  value: string
  type: 'sms_otp' | 'email_otp'
}) {
  return {
    type: Types.SAVE_TOKEN,
    payload,
  }
}
