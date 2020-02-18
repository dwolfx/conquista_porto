import { all, takeLatest, call, put } from 'redux-saga/effects'

import { post } from 'services/api'
import { Types } from './types'
import { PostObjectiveDataSuccess, PostObjectiveDataFailure } from './action'

function* postData(data) {
  const { payload } = data
  try {
    const response = yield call(post, '/goal/recommendations', payload)
    yield put(PostObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(PostObjectiveDataFailure())
  }
}

export default all([takeLatest(Types.POST_REQUEST, postData)])
