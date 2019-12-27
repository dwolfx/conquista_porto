import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      '/consorcios/imovel?cpfCnpj=33244452809&codigoCanal=0'
    )
    yield put(GetDataSuccess(response.data.Consorcios))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
