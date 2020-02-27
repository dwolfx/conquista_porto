import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, post } from 'services/api'
import { CleanObjectiveData } from 'store/modules/Objective/action'

import { Types } from './types'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  GetObjectiveManagementDataSuccess,
  GetObjectiveManagementDataFailure,
} from './action'

function* postData({ payload, pushHistory }) {
  try {
    const response = yield call(post, '/goal/goals', { id: payload })
    yield put(PostObjectiveManagementDataSuccess(response.data))
    pushHistory(`/objetivos/gerenciar/${response.data.id}`)
    yield put(CleanObjectiveData())
  } catch (err) {
    yield put(PostObjectiveManagementDataFailure())
  }
}

function* getData(payload) {
  try {
    const { history } = payload
    const response = yield call(get, `goal/goals/${payload.id}`)

    if (response.data) {
      yield put(GetObjectiveManagementDataSuccess(response.data))
    } else {
      yield put(GetObjectiveManagementDataFailure())
      history.push('/objetivos')
    }
  } catch (err) {
    yield put(GetObjectiveManagementDataFailure())
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.GET_REQUEST, getData),
])
