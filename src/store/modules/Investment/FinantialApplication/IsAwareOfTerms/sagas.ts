import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types, IGetIsAwareOfTermsPayload } from '../types'
import { getAuth, getSuitabilityInfo } from '../selectors'
import {
  GetIsAwareOfTermsDataSuccess,
  GetIsAwareOfTermsDataFailure,
} from './action'

function* getFinantialApplicationIsAwareOfTermsData({
  payload: { data, onErrorToast },
}: IGetIsAwareOfTermsPayload) {
  // data_operacao = YYYY-MM-DD
  const { id_fundo, data_operacao, valor, aceite_termo_adesao } = data

  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/aws/cotista/aplicacoes/resumo?id_fundo=${id_fundo}&id_cotista=${id_cotista}&cpf_cnpj=${cpf}&data_operacao=${data_operacao}&valor=${valor}&aceite_termo_adesao=${aceite_termo_adesao}`
    )

    yield put(GetIsAwareOfTermsDataSuccess(response.data))
  } catch (err) {
    yield put(GetIsAwareOfTermsDataFailure(err))
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente.',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export default all([
  takeLatest(
    Types.IS_AWARE_OF_TERMS_DATA_GET_REQUEST,
    getFinantialApplicationIsAwareOfTermsData
  ),
])
