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

export function* postData({ payload }) {
  const { data, isMobile, onSuccess } = payload

  try {
    let response
    if (isMobile) {
      response = yield call(
        post,
        `${baseURLNamespaceRecommendation}/recommendations?mobile=true`,
        data
      )
    } else {
      response = yield call(
        post,
        `${baseURLNamespaceRecommendation}/recommendations`,
        data
      )
    }
    yield put(PostObjectiveDataSuccess(response.data))

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    yield put({
      ...PostObjectiveDataFailure(),
      toast: buildToast(JSON.parse(err.message).msg, ToastTypes.error),
    })
  }
}

export function* getData() {
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
