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
  SET_LOADING: '2FA_SET_LOADING',
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

export interface IValidateTokenSignaturePayload {
  signature: string
  onSuccess: () => void
  onError: () => void
  addToast: (toast: Omit<IToast, 'id'>) => void
  goToPreviousStep: () => void
}

export interface IValidateTokenSignature {
  type: string
  payload: IValidateTokenSignaturePayload
}
