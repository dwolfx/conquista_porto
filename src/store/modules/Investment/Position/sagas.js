import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'

import { GetPositionDataSuccess, GetPositionDataFailure } from './action'
import { getConsolidatedPosition } from './selectors'
import { Types } from './types'

function* getData() {
  try {
    const consolidatedPositionState = yield select(getConsolidatedPosition)

    const saldoResponse = consolidatedPositionState.data
      ? consolidatedPositionState
      : yield call(
          get,
          `${baseURLNamespaceInvest}/cotistas/posicao-consolidada`
        )

    if (saldoResponse.data.saldototal > 0) {
      const response = yield call(
        get,
        `${baseURLNamespaceInvest}/cotistas/posicao?codigoCanal=0`
      )

      let responseData = response.data

      if (
        (response && response.data.Mensagem) ||
        response.data.TipoCritica === 'CRITICA_NEGOCIO'
      ) {
        responseData = []
      }

      yield put(GetPositionDataSuccess(responseData))
    } else {
      yield put(GetPositionDataSuccess([]))
    }
  } catch (err) {
    yield put(GetPositionDataFailure())
  }
}

export default all([takeLatest(Types.ADD_REQUEST, getData)])
