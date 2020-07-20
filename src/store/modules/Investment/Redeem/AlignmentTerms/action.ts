import { Types, IGetRedeemAlignmentTermsData } from './types'
import { IGetAlignmentTermsResponse } from '../../FinancialApplication/types'
import { IError } from '../types'

export function GetRedeemAlignmentTermsRequest(payload: IGetRedeemAlignmentTermsData) {
  return {
    type: Types.DATA_TERMS_REQUEST,
    payload
  }
}

export function GetRedeemAlignmentTermsSuccess(
  payload: IGetAlignmentTermsResponse
) {
  return {
    type: Types.DATA_TERMS_SUCCESS,
    payload,
  }
}

export function GetRedeemAlignmentTermsFailure({ message }: IError) {
  return {
    type: Types.DATA_TERMS_FAILURE,
    message,
  }
}
