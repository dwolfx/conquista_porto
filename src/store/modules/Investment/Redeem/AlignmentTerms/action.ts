import { Types, IGetRedeemAlignmentTermsData } from './types'
import { IGetAlignmentTermsResponse } from '../../FinancialApplication/types'
import { IError } from '../types'

export function GetRedeemAlignmentTermsRequest(payload: IGetRedeemAlignmentTermsData) {
  return {
    type: Types.REDEEM_TERMS_DATA_REQUEST,
    payload
  }
}

export function GetRedeemAlignmentTermsSuccess(
  payload: IGetAlignmentTermsResponse
) {
  return {
    type: Types.REDEEM_TERMS_DATA_SUCCESS,
    payload,
  }
}

export function GetRedeemAlignmentTermsFailure({ message }: IError) {
  return {
    type: Types.REDEEM_TERMS_DATA_FAILURE,
    message,
  }
}
