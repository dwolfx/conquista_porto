import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import { getDataValidate } from 'store/modules/SuitabilityInfo/sagas'
import { Types as SuitabilityTypes } from 'store/modules/SuitabilityInfo/types'

import {
  GetWithdrawSummarySuccess,
  GetWithdrawSummaryFailure,
  GetWithdrawDetailsSuccess,
  GetWithdrawDetailsFailure,
} from './action'
import { getAuth, getSuitabilityInfo } from './selectors'
import { Types, ISummaryRequest } from './types'

export function* getWithdrawDetails({ payload }: any) {
  const { onSuccess, onError, addToast } = payload

  try {
    const { cpf } = yield select(getAuth)
    let suitabilityInfo = yield select(getSuitabilityInfo)

    yield call(getDataValidate, {
      type: SuitabilityTypes.SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE,
      payload: {
        onSuccess: () => null,
        buttonType: 'retirar',
        onErrorToast: addToast,
      },
    })

    suitabilityInfo = yield select(getSuitabilityInfo)

    if (suitabilityInfo?.id_cotista && suitabilityInfo?.isValid) {
      const { data } = yield call(
        get,
        `${baseURLNamespaceInvestAws}/cotista/retiradas?id_cotista=${suitabilityInfo.id_cotista}&cpf_cnpj=${cpf}`
      )

      yield put(GetWithdrawDetailsSuccess(data.dadosRetirada))

      if (onSuccess) {
        onSuccess(data.dadosRetirada)
      }
    }
  } catch (err) {
    yield put(GetWithdrawDetailsFailure())

    if (onError) {
      onError(err)
    }
  }
}

export function* getWithdrawSummary({
  payload: { data, onSuccess, onError },
}: ISummaryRequest) {
  try {
    const auth = yield select(getAuth)
    const suitabilityInfo = yield select(getSuitabilityInfo)

    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cotista/retiradas/resumo?cpf_cnpj=${auth?.cpf}&id_cotista=${suitabilityInfo?.data?.id_cotista}&valor_operacao=${data.valor_operacao}`
    )

    yield put(
      GetWithdrawSummarySuccess({
        ...response?.data?.resumo_retirada,
        valor_operacao: data?.valor_operacao,
      })
    )

    if (onSuccess) {
      onSuccess(response?.data?.resumo_retirada)
    }
  } catch (err) {
    yield put(GetWithdrawSummaryFailure())

    if (onError) {
      onError(err)
    }
  }
}

export default all([
  takeLatest(Types.GET_WITHDRAW_DETAILS_REQUEST, getWithdrawDetails),
  takeLatest(Types.GET_WITHDRAW_SUMMARY_REQUEST, getWithdrawSummary),
])
