import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, post } from 'services/api'
import { CleanObjectiveData } from 'store/modules/Objective/action'

import { Types } from './types'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  PostSaveFundsSuccess,
  PostSaveFundsFailure,
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

function* postSaveFunds({ payload }) {
  const { idGoal, data } = payload
  try {
    const response = yield call(post, `/goal/goals/${idGoal}/funds`, data)
    yield put(PostSaveFundsSuccess(response))
  } catch (err) {
    yield put(PostSaveFundsFailure())
  }
}

function* getData(payload) {
  try {
    const { id, history, path } = payload
    const response = yield call(get, `/goal/goals/${id}`)

    if (response.data) {
      yield put(GetObjectiveManagementDataSuccess(response.data))

      if (path) {
        history.push(path)
      }
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
  takeLatest(Types.POST_SAVE_FUNDS_REQUEST, postSaveFunds),
  takeLatest(Types.GET_REQUEST, getData),
])
