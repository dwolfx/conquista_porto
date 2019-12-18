import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'

function* getData() {
  try {
    const response = yield call(get, '/produtos/v1/cartaocredito')
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export default all([takeLatest(Types.ADD_REQUEST, getData)])
