import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, post } from 'services/api'
import { Types } from './types'
import {
  GetObjectiveDataSuccess,
  GetObjectiveDataFailure,
  PostObjectiveDataSuccess,
  PostObjectiveDataFailure,
} from './action'

function* postData(data) {
  const { payload } = data
  try {
    const response = yield call(post, '/goal/recommendations', payload)
    yield put(PostObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(PostObjectiveDataFailure())
  }
}

function* getData() {
  try {
    const response = yield call(
      get,
      'http://api-proxy.conquista.sciensa.click:8080/api/goal/goals'
    )
    yield put(GetObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(GetObjectiveDataFailure())
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.GET_REQUEST, getData),
])
