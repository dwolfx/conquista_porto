import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'

/*
 * Mock: '/conta_porto?cpf=33244452809&codigoCanal=0'
 * Integração: '/conta/dados?cpf=33244452809&codigoCanal=0'
 */

function* getData() {
  try {
    const response = yield call(
      get,
      '/conta/dados?cpf=68826796220&codigoCanal=0'
    )
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export default all([takeLatest(Types.BANK_DATA_GET_DATA_REQUEST, getData)])
