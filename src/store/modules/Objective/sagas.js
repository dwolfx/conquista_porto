import { all, takeLatest, call, put } from 'redux-saga/effects'

import { post } from 'services/api'
import { baseUrlObjectives } from 'services/apiConfig'
import { Types } from './types'
import { PostObjectiveDataSuccess, PostObjectiveDataFailure } from './action'

function* postData(data) {
  const { payload } = data
  try {
    const response = yield call(post, baseUrlObjectives, payload)
    yield put(PostObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(PostObjectiveDataFailure())
  }
}

export default all([takeLatest(Types.POST_REQUEST, postData)])
