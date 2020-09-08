import { all, takeLatest, call, put } from 'redux-saga/effects'

import {
  get,
  post,
  remove,
  baseURLNamespaceGoal,
  baseURLNamespaceGoalFunds,
} from 'services/api'
import { CleanObjectiveData } from 'store/modules/Objective/action'
import { buildToast, ToastTypes } from 'store/modules/toastActions'

import { Types } from './types'
import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  PostSaveFundsSuccess,
  PostSaveFundsFailure,
  GetObjectiveManagementDataSuccess,
  GetObjectiveManagementDataFailure,
  GetOtherGoalsDataSuccess,
  GetOtherGoalsDataFailure,
  DeleteObjectiveSuccess,
  DeleteObjectiveFailure,
} from './action'

export function* postData({ data, pushHistory, onSuccess, onError }) {
  try {
    const response = yield call(post, `${baseURLNamespaceGoal}/goals`, {
      ...data,
    })
    yield put(PostObjectiveManagementDataSuccess(response.data))
    pushHistory(`/objetivos/gerenciar/${response.data.id}`)

    if (onSuccess) {
      onSuccess()
    }
    yield put(CleanObjectiveData())
  } catch (err) {
    yield put({
      ...PostObjectiveManagementDataFailure(),
      toast: buildToast(JSON.parse(err.message).msg, ToastTypes.error),
    })

    if (onError) {
      onError()
    }
  }
}

export function* postSaveFunds({ payload }) {
  const { idGoal, data, onSuccess } = payload
  try {
    const response = yield call(
      post,
      `${baseURLNamespaceGoalFunds}/goals/${idGoal}/funds`,
      data
    )
    yield put({
      ...PostSaveFundsSuccess(response.data),
      toast: buildToast('Alterações salvas com sucesso.', ToastTypes.success),
    })

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    yield put({
      ...PostSaveFundsFailure(),
      toast: buildToast(JSON.parse(err.message).msg, ToastTypes.error),
    })
  }
}

export function* getData(payload) {
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
        yield put({
          ...GetObjectiveManagementDataFailure(),
          toast: buildToast('Nenhum objetivo encontrado.', ToastTypes.error),
        })
      }
    } catch (err) {
      yield put({
        ...GetObjectiveManagementDataFailure(),
        toast: buildToast(JSON.parse(err.message).msg, ToastTypes.error),
      })
      history.push('/')
    }
  } else {
    yield put({
      ...GetObjectiveManagementDataFailure(),
      toast: buildToast(
        'Ocorreu um erro. Tente novamente mais tarde.',
        ToastTypes.error
      ),
    })
    history.push('/')
  }
}

export function* getOtherGoalsData(payload) {
  const { id, history, path } = payload

  // 'if' added to prevent an API call when breadcrumb is clicked
  if (id) {
    try {
      const response = yield call(
        get,
        `${baseURLNamespaceGoal}/goals/bytype/${id}`
      )

      if (response.data) {
        yield put(GetOtherGoalsDataSuccess(response.data))

        if (path) {
          history.push(path)
        }
      } else {
        yield put({
          ...GetOtherGoalsDataFailure(),
          toast: buildToast('Nenhum objetivo encontrado.', ToastTypes.error),
        })
      }
    } catch (err) {
      yield put({
        ...GetOtherGoalsDataFailure(),
        toast: buildToast(JSON.parse(err.message).msg, ToastTypes.error),
      })
      history.push('/')
    }
  } else {
    yield put({
      ...GetOtherGoalsDataFailure(),
      toast: buildToast(
        'Ocorreu um erro. Tente novamente mais tarde.',
        ToastTypes.error
      ),
    })
    history.push('/')
  }
}

export function* deleteObjective({ payload }) {
  try {
    const { id, pushHistoryToHomeScreen } = payload
    yield call(remove, `${baseURLNamespaceGoal}/goals/${id}`)
    pushHistoryToHomeScreen()
    yield put({
      ...DeleteObjectiveSuccess(),
      toast: buildToast('Objetivo deletado com sucesso.', ToastTypes.success),
    })
  } catch (err) {
    yield put({
      ...DeleteObjectiveFailure(),
      toast: buildToast(JSON.parse(err.message).msg, ToastTypes.error),
    })
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.POST_SAVE_FUNDS_REQUEST, postSaveFunds),
  takeLatest(Types.GET_REQUEST, getData),
  takeLatest(Types.GET_OTHER_GOALS_REQUEST, getOtherGoalsData),
  takeLatest(Types.DELETE_REQUEST, deleteObjective),
])
