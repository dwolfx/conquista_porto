import { call, all, select, takeLatest, put } from 'redux-saga/effects'
import { get, baseURLNamespaceInvest } from 'services/api'

import { IGetRedeemRequestData, Types } from "./types";
import { GetRedeemSuccess, GetRedeemFailure, RedeemLayerToggleOpen } from './action';
import { getSuitabilityInfo, getAuth } from './selectors';


function* getRedeemData({
  payload: { data_operacao, id_fundo, onErrorToast }
}: IGetRedeemRequestData) {

  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const params = `cpf_cnpj=${cpf}&id_cotista=${id_cotista}&data_operacao=${data_operacao}&id_fundo=${id_fundo}`
    const responseRedeem = yield call(
        get,
        `${baseURLNamespaceInvest}/aws/cotista/resgates?${params}`
      )
    yield put(RedeemLayerToggleOpen())
    yield put(GetRedeemSuccess(responseRedeem.data))
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