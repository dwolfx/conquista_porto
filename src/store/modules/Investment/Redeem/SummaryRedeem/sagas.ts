import { call, all, select, takeLatest, put } from 'redux-saga/effects'
import { get, baseURLNamespaceInvestAws } from 'services/api'

import { IGetRedeemSummaryRequestData, Types } from './types'
import { getSuitabilityInfo, getAuth } from '../selectors'
import { GetRedeemSummarySuccess, GetRedeemSummaryFailure } from './action'

export function* getRedeemSummaryData({
  payload: { data_operacao, id_fundo, valor, tipo_operacao, onErrorToast },
}: IGetRedeemSummaryRequestData) {
  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cotista%E2%80%8B/resumo/resgate?tipo_resgate=${tipo_operacao}&valor=${valor}&cpf_cnpj=${cpf}&id_cotista=${id_cotista}&data_operacao=${data_operacao}&id_fundo=${id_fundo}&CodigoCanal=1`
    )
    yield put(GetRedeemSummarySuccess(response.data))
  } catch (err) {
    yield put(GetRedeemSummaryFailure(err))

    if (onErrorToast) {
      onErrorToast({
        type: 'error',
        description: 'Por favor, tente novamente.',
        title: 'Erro ao enviar solicitação.',
      })
    }

    throw new Error(err)
  }
}

const redeemGetSummaryData = all([
  takeLatest(Types.REDEEM_SUMMARY_GET_DATA_REQUEST, getRedeemSummaryData),
])

export default redeemGetSummaryData
