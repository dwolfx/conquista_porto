import { Types } from './types'

export function GetBankExtractRequest(payload: any, cpf: string) {
  return {
    type: Types.GET_REQUEST,
    payload,
    cpf,
  }
}

export function GetBankExtractSuccess(payload: any) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetBankExtractFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}

export function ClearBankExtractData() {
  return {
    type: Types.CLEAR_DATA,
  }
}

export function OpenAccountExtractLayer() {
  return {
    type: Types.OPEN_ACCOUNT_EXTRACT_LAYER
  }
}

export function CloseAccountExtractLayer() {
  return {
    type: Types.CLOSE_ACCOUNT_EXTRACT_LAYER
  }
}
