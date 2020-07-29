import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import { GetCreditCardDataSuccess, GetCreditCardDataFailure } from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/cartoes?codigoCanal=0`
    )

    let responseData = response.data

    if (
      response.data.Mensagem ||
      response.data.TipoCritica === 'CRITICA_NEGOCIO'
    ) {
      responseData = []
    }

    yield put(GetCreditCardDataSuccess(responseData))
  } catch (err) {
    yield put(GetCreditCardDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
