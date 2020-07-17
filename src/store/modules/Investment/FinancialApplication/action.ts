import {
  Types,
  IGetFinancialApplicationData,
  IPostFinancialApplicationData,
  IGetFinancialApplicationDataResponse,
  IPostFinancialApplicationDataResponse,
  IError,
} from './types'

export function GetFinancialApplicationDataRequest(
  payload: IGetFinancialApplicationData
) {
  return {
    type: Types.DATA_GET_REQUEST,
    payload,
  }
}

export function GetFinancialApplicationDataSuccess(
  payload: IGetFinancialApplicationDataResponse
) {
  return {
    type: Types.DATA_GET_SUCCESS,
    payload,
  }
}

export function GetFinancialApplicationDataFailure({ message }: IError) {
  return {
    type: Types.DATA_GET_FAILURE,
    message,
  }
}

export function PostFinancialApplicationDataRequest(
  payload: IPostFinancialApplicationData
) {
  return {
    type: Types.DATA_POST_REQUEST,
    payload,
  }
}

export function PostFinancialApplicationDataSuccess(
  payload: IPostFinancialApplicationDataResponse
) {
  return {
    type: Types.DATA_POST_SUCCESS,
    payload,
  }
}

export function PostFinancialApplicationDataFailure({ message }: IError) {
  return {
    type: Types.DATA_POST_FAILURE,
    message,
  }
}
