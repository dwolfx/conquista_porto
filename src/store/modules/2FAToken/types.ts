import { IToast } from 'hooks/toast'

export const Types = {
  POST_REQUEST: '2FA_POST_REQUEST',
  POST_SUCCESS: '2FA_POST_SUCCESS',
  POST_FAILURE: '2FA_POST_FAILURE',
  VALIDATE_REQUEST: '2FA_VALIDATE_REQUEST',
  VALIDATE_SUCCESS: '2FA_VALIDATE_SUCCESS',
  VALIDATE_FAILURE: '2FA_VALIDATE_FAILURE',
  GET_PERSONALDATA_REQUEST: '2FA_GET_PERSONALDATA_REQUEST',
  GET_PERSONALDATA_SUCCESS: '2FA_GET_PERSONALDATA_SUCCESS',
  GET_PERSONALDATA_FAILURE: '2FA_GET_PERSONALDATA_FAILURE',
  RUN_INITIAL_REQUEST: '2FA_RUN_INITIAL_REQUEST',
  VALIDATE_TOKEN_SIGNATURE: '2FA_VALIDATE_TOKEN_SIGNATURE',
  SAVE_TOKEN: '2FA_SAVE_TOKEN',
}

export interface IPropsPostData {
  type: string
  payload: {
    type: 'email_otp' | 'sms_otp'
    addToast?: (toast: Omit<IToast, 'id'>) => void
  }
}

export interface IGeneratePayload {
  addToast: (toast: Omit<IToast, 'id'>) => void
  onSuccess?: () => void
}

export interface IGenerate {
  payload: IGeneratePayload
  type: string
}
