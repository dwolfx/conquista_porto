import { all, takeLatest, call, put } from 'redux-saga/effects'

import { post } from 'services/api'
import { CleanObjectiveData } from 'store/modules/Objective/action'

import { Types } from './types'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
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

export default all([takeLatest(Types.POST_REQUEST, postData)])
