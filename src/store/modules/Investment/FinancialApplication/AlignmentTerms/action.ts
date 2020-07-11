import {
  Types,
  IGetAlignmentTermsData,
  IGetAlignmentTermsResponse,
  IError,
} from '../types'

export function GetAlignmentTermsDataRequest(payload: IGetAlignmentTermsData) {
  return {
    type: Types.ALIGNMENT_TERMS_DATA_GET_REQUEST,
    payload,
  }
}

export function GetAlignmentTermsDataSuccess(
  payload: IGetAlignmentTermsResponse
) {
  return {
    type: Types.ALIGNMENT_TERMS_DATA_GET_SUCCESS,
    payload,
  }
}

export function GetAlignmentTermsDataFailure({ message }: IError) {
  return {
    type: Types.ALIGNMENT_TERMS_DATA_GET_FAILURE,
    message,
  }
}
