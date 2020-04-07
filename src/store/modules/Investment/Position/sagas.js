import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'

import { GetPositionDataSuccess, GetPositionDataFailure } from './action'
import { Types } from './types'

function* getData({ cpf }) {
  try {
    const saldoResponse = yield call(
      get,
      `${baseURLNamespaceInvest}/cotistas/posicao-consolidada?cpf=${cpf}`
    )

    if (saldoResponse.data.saldototal > 0) {
      const response = yield call(
        get,
        `${baseURLNamespaceInvest}/cotistas/posicao?cpf=${cpf}&codigoCanal=0`
      )

      let responseData = response.data

      if (
        (response && response.data.Mensagem) ||
        response.data.TipoCritica === 'CRITICA_NEGOCIO'
      ) {
        responseData = []
      }

      yield put(GetPositionDataSuccess(responseData))
    }
  } catch (err) {
    yield put(GetPositionDataFailure())
  }
}

export default all([takeLatest(Types.ADD_REQUEST, getData)])
