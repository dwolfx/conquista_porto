import { get, baseURLNamespaceInvest } from 'services/api'
import { GetDataSuccess, GetDataFailure } from './action'
import { all, takeLatest, call, put } from 'redux-saga/effects'
import { Types } from './types'

export function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/perfil/dados-cliente`
    )
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put({
      ...GetDataFailure(),
    })
  }
}

export default all([
  takeLatest(Types.CUSTOMER_PROFILE_GET_DATA_REQUEST, getData),
])
