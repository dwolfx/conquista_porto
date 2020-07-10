import {
  Types,
  IGetFinantialApplicationData,
  IPostFinantialApplicationData,
  IGetFinantialApplicationDataResponse,
  IPostFinantialApplicationDataResponse,
  IError,
} from './types'

export function GetFinantialApplicationDataRequest(
  payload: IGetFinantialApplicationData
) {
  return {
    type: Types.DATA_GET_REQUEST,
    payload,
  }
}

export function GetFinantialApplicationDataSuccess(
  payload: IGetFinantialApplicationDataResponse
) {
  return {
    type: Types.DATA_GET_SUCCESS,
    payload,
  }
}

export function GetFinantialApplicationDataFailure({ message }: IError) {
  return {
    type: Types.DATA_GET_FAILURE,
    message,
  }
}

export function PostFinantialApplicationDataRequest(
  payload: IPostFinantialApplicationData
) {
  return {
    type: Types.DATA_POST_REQUEST,
    payload,
  }
}

export function PostFinantialApplicationDataSuccess(
  payload: IPostFinantialApplicationDataResponse
) {
  return {
    type: Types.DATA_POST_SUCCESS,
    payload,
  }
}

export function PostFinantialApplicationDataFailure({ message }: IError) {
  return {
    type: Types.DATA_POST_FAILURE,
    message,
  }
}
