import { all, takeLatest, call, put } from 'redux-saga/effects'
import { buildToast, ToastTypes } from 'store/modules/toastActions'

import {
  get,
  post,
  put as putFromAPI,
  baseURLNamespaceGoal,
  baseURLNamespaceRecommendation,
} from 'services/api'
import { Types } from './types'
import {
  GetObjectiveDataSuccess,
  GetObjectiveDataFailure,
  PostObjectiveDataSuccess,
  PostObjectiveDataFailure,
  UpdateRecommendationSuccess,
  UpdateRecommendationFailure,
  PostRecalculateFundsSuccess,
  PostRecalculateFundsFailure,
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

// http://api-proxy.conquista.sciensa.click/api/sciensa/robo-swagger/conquista/robo/swagger-ui.html#/recommendations
export function* putRecommendationsData({
  payload: { data, onSuccess, onErrorToast },
}) {
  try {
    const response = yield call(
      putFromAPI,
      `${baseURLNamespaceRecommendation}/recommendations`,
      data
    )
    yield put(UpdateRecommendationSuccess(response.data))
    if (onSuccess) {
      onSuccess(response.data)
    }
  } catch (err) {
    yield put(UpdateRecommendationFailure())
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

// http://api-proxy.conquista.sciensa.click/api/sciensa/robo-swagger/conquista/robo/swagger-ui.html#/recommendations
export function* postRecalculateFunds({
  payload: { data, onSuccess, onErrorToast },
}) {
  try {
    const response = yield call(
      post,
      `${baseURLNamespaceRecommendation}/recommendations/recalculate-funds`,
      data
    )

    yield put(PostRecalculateFundsSuccess(response.data))
    if (onSuccess) {
      onSuccess(response.data)
    }
  } catch (err) {
    yield put(PostRecalculateFundsFailure())
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.POST_REQUEST_BY_SIMULATE, postData),
  takeLatest(Types.GET_REQUEST, getData),
  takeLatest(Types.PUT_RECOMMENDATION_REQUEST, putRecommendationsData),
  takeLatest(Types.POST_RECALCULATE_FUNDS_REQUEST, postRecalculateFunds),
])
