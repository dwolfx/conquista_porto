import { all, takeLatest, call, put } from 'redux-saga/effects'

import {
  get,
  post,
  remove,
  baseURLNamespaceGoal,
  baseURLNamespaceGoalFunds,
} from 'services/api'
import { CleanObjectiveData } from 'store/modules/Objective/action'

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

export function* postData({ data, pushHistory, onSuccess, addToast, onError }) {
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
    yield put(PostObjectiveManagementDataFailure())

    addToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: JSON.parse(err.message).msg || 'Erro ao enviar solicitação.',
    })

    if (onError) {
      onError()
    }
  }
}

export function* postSaveFunds({ payload }) {
  const { idGoal, data, onSuccess, addToast } = payload
  try {
    const response = yield call(
      post,
      `${baseURLNamespaceGoalFunds}/goals/${idGoal}/funds`,
      data
    )
    yield put(PostSaveFundsSuccess(response.data))

    addToast({
      type: 'success',
      title: 'Alterações salvas com sucesso.',
    })

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    yield put(PostSaveFundsFailure())

    addToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: JSON.parse(err.message).msg || 'Erro ao enviar solicitação.',
    })
  }
}

export function* getData(payload) {
  const { id, history, path, addToast } = payload

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

        addToast({
          type: 'error',
          title: 'Nenhum objetivo encontrado',
        })
      }
    } catch (err) {
      yield put(GetObjectiveManagementDataFailure())

      history.push('/')

      addToast({
        type: 'error',
        description: 'Ocorreu um erro',
        title: JSON.parse(err.message).msg || 'Tente novamente mais tarde.',
      })
    }
  } else {
    yield put(GetObjectiveManagementDataFailure())

    history.push('/')

    addToast({
      type: 'error',
      description: 'Ocorreu um erro',
      title: 'Tente novamente mais tarde.',
    })
  }
}

export function* getOtherGoalsData(payload) {
  const { id, history, path, addToast } = payload

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
        yield put(GetOtherGoalsDataFailure())

        addToast({
          type: 'error',
          title: 'Nenhum objetivo encontrado',
        })
      }
    } catch (err) {
      yield put(GetOtherGoalsDataFailure())

      history.push('/')

      addToast({
        type: 'error',
        description: 'Ocorreu um erro',
        title: JSON.parse(err.message).msg || 'Tente novamente mais tarde.',
      })
    }
  } else {
    yield put(GetOtherGoalsDataFailure())

    history.push('/')

    addToast({
      type: 'error',
      description: 'Ocorreu um erro',
      title: 'Tente novamente mais tarde.',
    })
  }
}

export function* deleteObjective({ payload }) {
  const { addToast } = payload

  try {
    const { id, pushHistoryToHomeScreen } = payload
    yield call(remove, `${baseURLNamespaceGoal}/goals/${id}`)
    pushHistoryToHomeScreen()

    yield put(DeleteObjectiveSuccess())

    addToast({
      type: 'success',
      title: 'Objetivo deletado com sucesso',
    })
  } catch (err) {
    yield put(DeleteObjectiveFailure())

    addToast({
      type: 'error',
      description: 'Ocorreu um erro',
      title: JSON.parse(err.message).msg || 'Tente novamente mais tarde.',
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
