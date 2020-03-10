import { all, takeLatest, call, put } from 'redux-saga/effects'
import { buildToast, ToastTypes } from 'store/modules/toastActions'

import {
  get,
  post,
  baseURLNamespaceGoal,
  baseURLNamespaceRecommendation,
} from 'services/api'
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
        `${baseURLNamespaceRecommendation}/recommendations?mobile=true`,
        payload
      )
    } else {
      response = yield call(
        post,
        `${baseURLNamespaceRecommendation}/recommendations`,
        payload
      )
    }
    yield put(PostObjectiveDataSuccess(response.data))
  } catch (err) {
    yield put({
      ...PostObjectiveDataFailure(),
      toast: buildToast(err.message, ToastTypes.error),
    })
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
  takeLatest(Types.POST_REQUEST_BY_SIMULATE, postData),
  takeLatest(Types.GET_REQUEST, getData),
])
