import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, post, remove, baseURLNamespaceGoal } from 'services/api'
import { CleanObjectiveData } from 'store/modules/Objective/action'

import { Types } from './types'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  PostSaveFundsSuccess,
  PostSaveFundsFailure,
  GetObjectiveManagementDataSuccess,
  GetObjectiveManagementDataFailure,
  DeleteObjectiveSuccess,
  DeleteObjectiveFailure,
} from './action'

function* postData({ payload, pushHistory }) {
  try {
    const response = yield call(post, `${baseURLNamespaceGoal}/goals`, {
      id: payload,
    })
    yield put(PostObjectiveManagementDataSuccess(response.data))
    pushHistory(`/objetivos/gerenciar/${response.data.id}`)
    yield put(CleanObjectiveData())
  } catch (err) {
    yield put(PostObjectiveManagementDataFailure())
  }
}

function* postSaveFunds({ payload }) {
  const { idGoal, data, onSuccess } = payload
  try {
    const response = yield call(
      post,
      `${baseURLNamespaceGoal}/goals/${idGoal}/funds`,
      data
    )
    yield put(PostSaveFundsSuccess(response))

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    yield put(PostSaveFundsFailure())
  }
}

function* getData(payload) {
  const { id, history, path } = payload

  // 'if' added to prevent an API call when breadcrumb is clicked
  if (id) {
    try {
      const response = yield call(get, `${baseURLNamespaceGoal}/goals/${id}`)

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
      history.push('/objetivos')
    }
  } else {
    yield put(GetObjectiveManagementDataFailure())
    history.push('/objetivos')
  }
}

function* deleteObjective({ payload }) {
  try {
    const { id, pushHistoryToHomeScreen } = payload
    yield call(remove, `${baseURLNamespaceGoal}/goals/${id}`)
    pushHistoryToHomeScreen()
    yield put(DeleteObjectiveSuccess())
  } catch (err) {
    yield put(DeleteObjectiveFailure())
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.POST_SAVE_FUNDS_REQUEST, postSaveFunds),
  takeLatest(Types.GET_REQUEST, getData),
  takeLatest(Types.DELETE_REQUEST, deleteObjective),
])
