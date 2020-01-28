import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'

// eslint-disable-next-line no-unused-vars
function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `/conta/dados?cpf=68826796220&codigoCanal=0`
    )
    // const response = yield call(get, `/conta/dados?cpf=${cpf}&codigoCanal=0`)
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export default all([takeLatest(Types.BANK_DATA_GET_DATA_REQUEST, getData)])
