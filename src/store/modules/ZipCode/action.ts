import { CEPResponse } from 'pages/CreditCard/Creation/types'
import { ZipCodeType } from './types'

export function GetZipCodeeDataRequest(payload: string) {
  return {
    type: ZipCodeType.GET_DATA_REQUEST,
    payload,
  }
}

export function GetZipCodeeDataSuccess(payload: CEPResponse) {
  return {
    type: ZipCodeType.GET_DATA_SUCCESS,
    payload,
  }
}

export function GetZipCodeeDataFailure() {
  return {
    type: ZipCodeType.GET_DATA_FAILURE,
  }
}

export function GetZipCodeeDataClean() {
  return {
    type: ZipCodeType.GET_DATA_CLEAN,
  }
}
