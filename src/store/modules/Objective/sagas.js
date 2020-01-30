import { all, takeLatest, call, put } from 'redux-saga/effects'

import axios from 'axios'
import { Types } from './types'
import { PostObjectiveDataSuccess, PostObjectiveDataFailure } from './action'

function* postData(data) {
  const { payload } = data
  try {
    const response = yield call(
      axios.post,
      'http://192.168.11.4:5000/v1/recommendation',
      payload
    )
    yield put(PostObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put(PostObjectiveDataFailure())
  }
}

export default all([takeLatest(Types.POST_REQUEST, postData)])
