import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/conta/dados?cpf=${cpf}&codigoCanal=0`
    )

    if (!response.data.DadosContaPortoSeguro) {
      throw Error()
    }
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export default all([takeLatest(Types.BANK_DATA_GET_DATA_REQUEST, getData)])
