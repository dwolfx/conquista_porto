import { all, takeLatest, call, put } from 'redux-saga/effects'

import { post } from 'services/api'
import { CleanObjectiveData } from 'store/modules/Objective/action'

import { Types } from './types'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  PostSaveFundsSuccess,
  PostSaveFundsFailure,
} from './action'

function* postData({ payload, pushHistory }) {
  try {
    const response = yield call(post, '/goal/goals', { id: payload })
    yield put(PostObjectiveManagementDataSuccess(response.data))
    pushHistory('/objetivos/gerenciar')
    yield put(CleanObjectiveData())
  } catch (err) {
    yield put(PostObjectiveManagementDataFailure())
  }
}

function* postSaveFunds({ fundId }) {
  const data = {
    fund_list: [
      {
        id: 51380129,
        value: 300,
      },
      {
        id: 5071,
        value: 400,
      },
    ],
  }
  try {
    const response = yield call(post, `/goal/goals/${fundId}/funds`, data)
    yield put(PostSaveFundsSuccess(response))
  } catch (err) {
    yield put(PostSaveFundsFailure())
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.POST_SAVE_FUNDS_REQUEST, postSaveFunds),
])
