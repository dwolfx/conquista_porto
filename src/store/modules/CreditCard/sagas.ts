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
import { loggerSucess, loggerError } from 'logger'
import { ICreditCardClientDataRequest, Types } from './types'

export function* getData() {
  const getCreditCardDataURL = `${baseURLNamespaceInvest}/cartoes?codigoCanal=0`
  try {
    const response = yield call(get, getCreditCardDataURL)

    let responseData = response.data

    if (
      response.data.Mensagem ||
      response.data.TipoCritica === 'CRITICA_NEGOCIO'
    ) {
      responseData = []
    }

    yield put(GetCreditCardDataSuccess(responseData))
    loggerSucess(getCreditCardDataURL, 'GET', response?.status)
  } catch (err) {
    yield put(GetCreditCardDataFailure())
    loggerError(getCreditCardDataURL, 'GET', err)
  }
}

function* getClientData({
  onSuccess,
  onError,
  addToast,
}: ICreditCardClientDataRequest) {
  const getCreditCardClientDataURL = `${baseURLNamespaceInvestAws}/cartoes/dados/cliente/cadastrado`
  try {
    const { data, status } = yield call(get, getCreditCardClientDataURL)

    yield put(GetCreditCardClientDataSuccess(data))
    loggerSucess(getCreditCardClientDataURL, 'GET', status)

    if (onSuccess) {
      onSuccess(data)
    }
  } catch (error) {
    yield put(GetCreditCardClientDataFailure())
    loggerError(getCreditCardClientDataURL, 'GET', error)

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
