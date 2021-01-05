import { all, takeLatest, call, put } from 'redux-saga/effects'

import { post, baseURLNamespaceInvestAws } from 'services/api'
import {
  Types,
  IInsuranceQuotationRequest,
  IInsuranceQuotationResponse,
} from './types'
import {
  PostInsuranceQuotationRequest,
  PostInsuranceQuotationSuccess,
  PostInsuranceQuotationFailure,
} from './action'
import { IToast } from 'hooks/toast'

export function* postInsuranceQuotation({
  type,
  payload,
  onErrorToast,
  onSuccess,
}: {
  type: keyof typeof Types
  payload: IInsuranceQuotationRequest
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
  onSuccess: () => void
}) {
  try {
    const { data } = yield call(
      post,
      `${baseURLNamespaceInvestAws}/viagem/cotacao/seguro`,
      payload
    )

    yield put(PostInsuranceQuotationSuccess(data))
    if (onSuccess) onSuccess()
  } catch (err) {
    yield put(PostInsuranceQuotationFailure())
  }
}

export default all([
  takeLatest(Types.POST_INSURANCE_QUOTATION_REQUEST, postInsuranceQuotation),
])
