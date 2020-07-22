import { call, all, select, takeLatest, put } from 'redux-saga/effects'
import { get, baseURLNamespaceInvest } from 'services/api'

import { IGetRedeemRequestData, Types } from "./types";
import { GetRedeemSuccess, GetRedeemFailure, RedeemLayerToggleOpen } from './action';
import { getSuitabilityInfo, getAuth } from './selectors';


function* getRedeemData({
  payload: { data_operacao, id_fundo, valor, onErrorToast }
}: IGetRedeemRequestData) {

  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const params = `cpf_cnpj=${cpf}&id_cotista=${id_cotista}&data_operacao=${data_operacao}&id_fundo=${id_fundo}`
    const [responseRedeem, responseRedeemSummary]: any = yield all([
      call(
        get,
        `${baseURLNamespaceInvest}/aws/cotista/resgates?${params}`
      ),
      call(
        get,
        `${baseURLNamespaceInvest}/aws/cotista/resgates/resumo?tipo_resgate=2&valor=${valor}&${params}`
      )
    ])
    yield put(RedeemLayerToggleOpen())

    const enrichedResponse = {
      ...responseRedeem.data,
      ...responseRedeemSummary.data
    }
    yield put(GetRedeemSuccess(enrichedResponse))
  } catch (err) {
    yield put(GetRedeemFailure(err))
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente.',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export const redeemGetData = all([
  takeLatest(Types.REDEEM_DATA_GET_REQUEST, getRedeemData),
])