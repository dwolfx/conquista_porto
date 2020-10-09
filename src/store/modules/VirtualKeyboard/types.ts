import { IToast } from 'hooks/toast'

export const Types = {
  POST_REQUEST: 'VIRTUAL_KEYBOARD_POST_REQUEST',
  POST_NEW_SIGNATURE: 'VIRTUAL_KEYBOARD_POST_NEW_SIGNATURE',
  SET_LOADING_NEW_SIGNATURE: 'VIRTUAL_KEYBOARD_SET_LOADING_NEW_SIGNATURE',
  POST_SUCCESS: 'VIRTUAL_KEYBOARD_POST_SUCCESS',
  POST_FAILURE: 'VIRTUAL_KEYBOARD_POST_FAILURE',
  VALIDATE_REQUEST: 'VIRTUAL_KEYBOARD_VALIDATE_REQUEST',
  VALIDATE_SUCCESS: 'VIRTUAL_KEYBOARD_VALIDATE_SUCCESS',
  VALIDATE_FAILURE: 'VIRTUAL_KEYBOARD_VALIDATE_FAILURE',
  SET_LOADING: 'VIRTUAL_KEYBOARD_SET_LOADING',
}

export interface IGenerateNewSignaturePayload {
  type: string
  payload: {
    type: 'email_otp' | 'sms_otp'
    onSuccessChangeStep: (stepNumber: number) => void
    addToast?: (toast: Omit<IToast, 'id'>) => void
    handleModalNewSignatureCloseOrOpen: (closeModal: boolean) => void
  }
}

interface ObjRegisteredDevice {
  name: string
  value: string
}

export interface IResgisteredDevice {
  data: ObjRegisteredDevice[]
}
