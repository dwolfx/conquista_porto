import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'

import { Types } from './types'
import { GetRewardTypesSuccess, GetRewardTypesFailure } from './action'

function* getData() {
  try {
    const response = yield call(get, `/rewards/types`)
    yield put(GetRewardTypesSuccess(response.data))
  } catch (err) {
    yield put(GetRewardTypesFailure())
  }
}

export default all([takeLatest(Types.GET_TYPES_REQUEST, getData)])
