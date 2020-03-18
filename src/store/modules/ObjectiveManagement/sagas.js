import { all, takeLatest, call, put } from 'redux-saga/effects'

import { formatMoneyWithoutCurrencyFlag } from 'helpers'

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
    yield put({
      ...PostObjectiveManagementDataFailure(),
      toast: buildToast(err.message, ToastTypes.error),
    })
  }
}

function* postSaveFunds({ payload }) {
  const { idGoal, data, onSuccess } = payload

  const dataFormated = {
    fund_list: data.fund_list.map(item => {
      const { id, invested } = item
      return { value: formatMoneyWithoutCurrencyFlag(invested * 100), id }
    }),
  }

  try {
    yield call(
      post,
      `${baseURLNamespaceGoalFunds}/goals/${idGoal}/funds`,
      dataFormated
    )

    yield put({
      ...PostSaveFundsSuccess(data),
      toast: buildToast('Alterações salvas com sucesso.', ToastTypes.success),
    })

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    yield put({
      ...PostSaveFundsFailure(),
      toast: buildToast(err.message, ToastTypes.error),
    })
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
        yield put({
          ...GetObjectiveManagementDataFailure(),
          toast: buildToast('Nenhum objetivo encontrado.', ToastTypes.error),
        })
      }
    } catch (err) {
      yield put({
        ...GetObjectiveManagementDataFailure(),
        toast: buildToast(err.message, ToastTypes.error),
      })
      history.push('/')
    }
  } else {
    yield put({
      ...GetObjectiveManagementDataFailure(),
      toast: buildToast(
        'Ocorreu um erro. Tente novamente mais tarde',
        ToastTypes.error
      ),
    })
    history.push('/')
  }
}

function* deleteObjective({ payload }) {
  try {
    const { id, pushHistoryToHomeScreen } = payload
    yield call(remove, `${baseURLNamespaceGoal}/goals/${id}`)
    pushHistoryToHomeScreen()
    yield put({
      ...DeleteObjectiveSuccess(),
      toast: buildToast('Objetivo deletado com sucesso', ToastTypes.success),
    })
  } catch (err) {
    yield put({
      ...DeleteObjectiveFailure(),
      toast: buildToast(err.message, ToastTypes.success),
    })
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.POST_SAVE_FUNDS_REQUEST, postSaveFunds),
  takeLatest(Types.GET_REQUEST, getData),
  takeLatest(Types.DELETE_REQUEST, deleteObjective),
])
