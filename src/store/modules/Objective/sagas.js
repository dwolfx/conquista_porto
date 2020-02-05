import { all, takeLatest, call, put } from 'redux-saga/effects'

import axios from 'axios'
import { Types } from './types'
import { PostObjectiveDataSuccess, PostObjectiveDataFailure } from './action'

function* postData(data) {
  const { payload } = data
  try {
    const response = yield call(
      axios.post,
      'http://107cb531.ngrok.io/v1/recommendation',
      payload
    )
    yield put(PostObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(PostObjectiveDataFailure())
  }
}

export default all([takeLatest(Types.POST_REQUEST, postData)])
