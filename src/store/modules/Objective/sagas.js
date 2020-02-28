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
  const { isMobile } = data
  try {
    let response
    if (isMobile) {
      response = yield call(post, `/goal/recommendations?mobile=true`, payload)
    } else {
      response = yield call(post, '/goal/recommendations', payload)
    }
    yield put(PostObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(PostObjectiveDataFailure())
  }
}

function* getData() {
  try {
    const response = yield call(get, '/goal/goals')
    yield put(GetObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(GetObjectiveDataFailure())
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.GET_REQUEST, getData),
])
