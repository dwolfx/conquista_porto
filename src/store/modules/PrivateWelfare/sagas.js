import { all, takeLatest, call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { get } from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      '/previdencia?cpfCnpj=33244452809&codigoCanal=0'
    )
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export default all([
  takeLatest(Types.PRIVATE_WELFARE_GET_DATA_REQUEST, getData),
])
