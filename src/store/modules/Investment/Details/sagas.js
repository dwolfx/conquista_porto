import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'

import { GetDataSuccess, GetDataFailure } from './action'
import { Types } from './types'

function* getData(action) {
  try {
    const response = yield call(get, `/fundos/${action.fundId}`)
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_DETAILS_ADD_REQUEST, getData)])
