import {
  Types,
  IGetIsAwareOfTermsData,
  IGetIsAwareOfTermsResponse,
  IError,
} from '../types'

export function GetIsAwareOfTermsDataRequest(payload: IGetIsAwareOfTermsData) {
  return {
    type: Types.IS_AWARE_OF_TERMS_DATA_GET_REQUEST,
    payload,
  }
}

export function GetIsAwareOfTermsDataSuccess(
  payload: IGetIsAwareOfTermsResponse
) {
  return {
    type: Types.IS_AWARE_OF_TERMS_DATA_GET_SUCCESS,
    payload,
  }
}

export function GetIsAwareOfTermsDataFailure({ message }: IError) {
  return {
    type: Types.IS_AWARE_OF_TERMS_DATA_GET_FAILURE,
    message,
  }
}
