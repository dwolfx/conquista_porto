import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, post, baseURLNamespaceGoal } from 'services/api'
import { Types } from './types'
import {
  GetObjectiveDataSuccess,
  GetObjectiveDataFailure,
  PostObjectiveDataSuccess,
  PostObjectiveDataFailure,
} from './action'

function* postData(data) {
  const { payload, isMobile } = data
  try {
    let response
    if (isMobile) {
      response = yield call(
        post,
        `${baseURLNamespaceGoal}/recommendations?mobile=true`,
        payload
      )
    } else {
      response = yield call(
        post,
        `${baseURLNamespaceGoal}/recommendations`,
        payload
      )
    }
    yield put(PostObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(PostObjectiveDataFailure())
  }
}

function* getData() {
  try {
    const response = yield call(get, `${baseURLNamespaceGoal}/goals`)
    yield put(GetObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(GetObjectiveDataFailure())
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.GET_REQUEST, getData),
])
