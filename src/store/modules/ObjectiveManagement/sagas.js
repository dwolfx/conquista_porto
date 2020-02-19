import { all, takeLatest, call, put } from 'redux-saga/effects'

import { post } from 'services/api'
import { Types } from './types'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
} from './action'

function* postData(data) {
  const { payload } = data
  try {
    const response = yield call(post, '/recommendation', payload)
    yield put(PostObjectiveManagementDataSuccess(response.data))
  } catch (err) {
    yield put(PostObjectiveManagementDataFailure())
  }
}

export default all([takeLatest(Types.POST_REQUEST, postData)])
