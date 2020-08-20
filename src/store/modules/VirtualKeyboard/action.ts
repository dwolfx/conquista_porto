import { Types } from './types'
import { IToast } from 'hooks/toast'

export function PostVirtualKeyboardDataRequest() {
  return {
    type: Types.POST_REQUEST,
  }
}

export function PostVirtualKeyboardDataSuccess(payload: any) {
  return {
    type: Types.POST_SUCCESS,
    payload,
  }
}

export function PostVirtualKeyboardDataFailure() {
  return {
    type: Types.POST_FAILURE,
  }
}

export function PutVirtualKeyboardDataRequest(payload: string) {
  return {
    type: Types.VALIDATE_REQUEST,
    payload,
  }
}

export function PutVirtualKeyboardDataSuccess() {
  return {
    type: Types.VALIDATE_SUCCESS,
  }
}

export function PutVirtualKeyboardDataFailure() {
  return {
    type: Types.VALIDATE_FAILURE,
  }
}

export function SetKeyboardLoading(payload: boolean) {
  return {
    type: Types.SET_LOADING,
    payload,
  }
}

export function SetNewSignatureLoading(payload: boolean) {
  return {
    type: Types.SET_LOADING_NEW_SIGNATURE,
    payload,
  }
}

export function PostNewSignatureDataRequest(
  type: 'email_otp' | 'sms_otp',
  addToast?: (toast: Omit<IToast, 'id'>) => void,
  handleModalNewSignatureCloseOrOpen?: (closeModal: boolean) => void
) {
  return {
    type: Types.POST_NEW_SIGNATURE,
    payload: {
      type,
      addToast,
      handleModalNewSignatureCloseOrOpen,
    },
  }
}
