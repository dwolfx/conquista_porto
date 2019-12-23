import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'

function* getData() {
  try {
    const response = yield call(get, '/produto/v1/previdencia')
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export default all([
  takeLatest(Types.PRIVATE_WELFARE_GET_DATA_REQUEST, getData),
])
