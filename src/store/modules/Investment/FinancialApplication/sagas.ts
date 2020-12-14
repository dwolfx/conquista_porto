import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { get, post, baseURLNamespaceInvestAws } from 'services/api'
import {
  Types,
  IGetFinancialApplicationPayload,
  IPostFinancialApplicationPayload,
} from './types'
import { getAuth, getSuitabilityInfo } from './selectors'
import {
  GetFinancialApplicationDataSuccess,
  GetFinancialApplicationDataFailure,
  PostFinancialApplicationDataSuccess,
  PostFinancialApplicationDataFailure,
} from './action'

export function* getFinancialApplicationData({
  payload: { data, onErrorToast, onSuccess },
}: IGetFinancialApplicationPayload) {
  // data_operacao = YYYY-MM-DD
  const { id_fundo, data_operacao } = data
  const { id_cotista } = yield select(getSuitabilityInfo)

  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cotista/aplicacoes?id_fundo=${id_fundo}&id_cotista=${id_cotista}&data_operacao=${data_operacao}`
    )

    yield put(GetFinancialApplicationDataSuccess(response.data))

    if (onSuccess) {
      onSuccess(response.data)
    }
  } catch (err) {
    yield put(GetFinancialApplicationDataFailure(err))
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export function* postFinancialApplicationData({
  payload: { data, onError, onSuccess },
}: IPostFinancialApplicationPayload) {
  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const response = yield call(
      post,
      `${baseURLNamespaceInvestAws}/cotista/aplicacoes`,
      {
        ...data,
        cpf_cnpj: cpf,
        id_cotista: id_cotista,
        ciencia_desenquadramento: 'S',
      }
    )

    yield put(PostFinancialApplicationDataSuccess(response.data))

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    yield put(PostFinancialApplicationDataFailure(err))
    if (onError) {
      onError()
    }
  }
}

export const financialApplicationGetData = all([
  takeLatest(Types.DATA_GET_REQUEST, getFinancialApplicationData),
])
export const financialApplicationPostData = all([
  takeLatest(Types.DATA_POST_REQUEST, postFinancialApplicationData),
])
