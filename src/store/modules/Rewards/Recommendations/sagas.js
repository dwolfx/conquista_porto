import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceRewards } from 'services/api'

import { Types } from './types'
import {
  GetRewardRecommendationsSuccess,
  GetRewardRecommendationsFailure,
} from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceRewards}/recommendations`
    )
    yield put(GetRewardRecommendationsSuccess(response.data))
  } catch (err) {
    yield put(GetRewardRecommendationsFailure())
  }
}

export default all([takeLatest(Types.GET_RECOMMENDATIONS_REQUEST, getData)])
