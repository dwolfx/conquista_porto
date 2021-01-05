import { IToast } from 'hooks/toast'
import {
  Types,
  IInsuranceQuotationRequest,
  IInsuranceQuotationResponse,
} from './types'

export function PostInsuranceQuotationRequest({
  payload,
  onErrorToast,
  onSuccess,
}: {
  payload: IInsuranceQuotationRequest
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
  onSuccess: () => void
}) {
  return {
    type: Types.POST_INSURANCE_QUOTATION_REQUEST,
    payload,
    onErrorToast,
    onSuccess,
  }
}

export function PostInsuranceQuotationSuccess(
  payload: IInsuranceQuotationResponse
) {
  return {
    type: Types.POST_INSURANCE_QUOTATION_SUCCESS,
    payload,
  }
}

export function PostInsuranceQuotationFailure() {
  return {
    type: Types.POST_INSURANCE_QUOTATION_FAILURE,
  }
}
