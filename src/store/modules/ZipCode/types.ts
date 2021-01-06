import { CEPResponse } from 'pages/CreditCard/Creation/types'

export enum ZipCodeType {
  GET_DATA_REQUEST = 'ZIP_CODE_GET_DATA_REQUEST',
  GET_DATA_SUCCESS = 'ZIP_CODE_GET_DATA_SUCCESS',
  GET_DATA_FAILURE = 'ZIP_CODE_GET_DATA_FAILURE',
  GET_DATA_CLEAN = 'ZIP_CODE_GET_DATA_CLEAN',
}

// State creators
export interface ZipCodeState {
  readonly data: CEPResponse | null
  readonly isLoading: boolean
  readonly hasError: boolean
}

export interface IGetZipCodeeDataRequestAction {
  readonly type: ZipCodeType.GET_DATA_REQUEST
  readonly payload: string
}

export interface IGetZipCodeeDataSuccessAction {
  readonly type: ZipCodeType.GET_DATA_SUCCESS
  readonly payload: {
    readonly data: CEPResponse
  }
}

export interface IGetZipCodeeDataFailureAction {
  readonly type: ZipCodeType.GET_DATA_FAILURE
}

export interface IGetZipCodeeDataCleanAction {
  readonly type: ZipCodeType.GET_DATA_CLEAN
}

export type ActionTypes =
  | IGetZipCodeeDataRequestAction
  | IGetZipCodeeDataSuccessAction
  | IGetZipCodeeDataFailureAction
  | IGetZipCodeeDataCleanAction
