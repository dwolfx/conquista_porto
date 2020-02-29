import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, post, remove } from 'services/api'
import { CleanObjectiveData } from 'store/modules/Objective/action'

import { Types } from './types'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  GetObjectiveManagementDataSuccess,
  GetObjectiveManagementDataFailure,
  DeleteObjectiveSuccess,
  DeleteObjectiveFailure,
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

function* deleteObjective({ payload }) {
  try {
    const { id, pushHistoryToHomeScreen } = payload
    yield call(remove, `/goal/goals/${id}/funds`)
    yield put(DeleteObjectiveSuccess())
    pushHistoryToHomeScreen()
  } catch (err) {
    yield put(DeleteObjectiveFailure())
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.GET_REQUEST, getData),
  takeLatest(Types.DELETE_REQUEST, deleteObjective),
])
