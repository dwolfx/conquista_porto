import { all, takeLatest, call, put } from 'redux-saga/effects'

import {
  get,
  baseURLNamespaceInvest,
  baseURLNamespaceInvestAws,
} from 'services/api'
import {
  GetCreditCardDataSuccess,
  GetCreditCardDataFailure,
  GetCreditCardClientDataFailure,
  GetCreditCardClientDataSuccess,
} from './action'
import { ICreditCardClientDataRequest, Types } from './types'

export function* getData() {
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

function* getClientData({
  onSuccess,
  onError,
  addToast,
}: ICreditCardClientDataRequest) {
  try {
    const { data } = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cartoes/dados/cliente/cadastrado`
    )

    yield put(GetCreditCardClientDataSuccess(data))

    if (onSuccess) {
      onSuccess(data)
    }
  } catch (error) {
    yield put(GetCreditCardClientDataFailure())

    if (onError) {
      onError()
    }
    if (addToast) {
      addToast({
        type: 'error',
        title: 'Algo inesperado aconteceu',
        description: 'Tente novamente dentro de alguns instantes.',
      })
    }
  }
}

export default all([
  takeLatest(Types.GET_REQUEST, getData),
  takeLatest(Types.GET_CLIENT_DATA_REQUEST, getClientData),
])
