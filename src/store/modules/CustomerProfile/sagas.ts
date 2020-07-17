import { get, baseURLNamespaceInvestAws } from 'services/api'
import { GetDataSuccess, GetDataFailure } from './action'
import { all, takeLatest, call, put } from 'redux-saga/effects'
import { Types } from './types'

function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cliente/dados`
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
