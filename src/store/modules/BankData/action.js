import { Types } from './types'

export function GetBankDataRequest(cpf, token) {
  return {
    type: Types.BANK_DATA_GET_DATA_REQUEST,
    cpf,
    token,
  }
}

export function GetDataSuccess(payload) {
  return {
    type: Types.BANK_DATA_GET_DATA_SUCCESS,
    payload,
  }
}

export function GetDataFailure() {
  return {
    type: Types.BANK_DATA_GET_DATA_FAILURE,
  }
}
