import { all, takeLatest, call, select, put } from 'redux-saga/effects'

import {
  get,
  post,
  put as axiosPut,
  remove,
  patch,
  baseURLNamespaceGoal,
  put as putMethod,
} from 'services/api'
import { CleanObjectiveData } from 'store/modules/Objective/action'

import {
  PostObjectiveManagementDataSuccess,
  PostObjectiveManagementDataFailure,
  GetObjectiveManagementDataSuccess,
  GetObjectiveManagementDataFailure,
  DeleteObjectiveSuccess,
  DeleteObjectiveFailure,
  UpdateObjectiveNicknameSuccess,
  UpdateObjectiveNicknameFailure,
  PutObjectiveFundsMovementSuccess,
  PutObjectiveFundsMovementFailure,
} from './action'
import { getGoalId } from './selectors'
import {
  IDeleteObjectiveRequest,
  IGetObjectiveManagementDataRequest,
  IPostObjectiveManagementDataRequest,
  IPutObjectiveFundsMovementRequest,
  IUpdateObjectiveNicknameRequest,
  Types,
} from './types'

export function* postData({
  data,
  pushHistory,
  onSuccess,
  addToast,
  onError,
}: IPostObjectiveManagementDataRequest) {
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

export function* getData({
  id,
  onSuccess,
  onError,
  addToast,
}: IGetObjectiveManagementDataRequest) {
  // 'if' added to prevent an API call when breadcrumb is clicked
  if (id) {
    try {
      const response = yield call(get, `${baseURLNamespaceGoal}/goals/${id}`)

      if (response.data) {
        yield put(GetObjectiveManagementDataSuccess(response.data))

        if (onSuccess) {
          onSuccess()
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

      if (onError) {
        onError()
      }

      addToast({
        type: 'error',
        description: 'Ocorreu um erro',
        title: JSON.parse(err.message).msg || 'Tente novamente mais tarde.',
      })
    }
  } else {
    yield put(GetObjectiveManagementDataFailure())

    if (onError) {
      onError()
    }

    addToast({
      type: 'error',
      description: 'Ocorreu um erro',
      title: 'Tente novamente mais tarde.',
    })
  }
}

export function* deleteObjective({
  addToast,
  id,
  pushHistoryToHomeScreen,
}: IDeleteObjectiveRequest) {
  try {
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

function* putObjectiveFundsMovement({
  data,
  addToast,
  onSuccess,
  onError,
}: IPutObjectiveFundsMovementRequest) {
  try {
    const goalId = yield select(getGoalId)

    const response = yield call(
      putMethod,
      `${baseURLNamespaceGoal}/goals/${goalId}`,
      data
    )

    yield put(PutObjectiveFundsMovementSuccess(response.data))

    if (onSuccess) {
      onSuccess()
    }

    addToast({
      type: 'success',
      title: 'Movimentação do fundo alterada com sucesso',
    })
  } catch (error) {
    yield put(PutObjectiveFundsMovementFailure())

    if (onError) {
      onError()
    }

    addToast({
      type: 'error',
      description: 'Ocorreu um erro',
      title: JSON.parse(error.message).msg || 'Tente novamente mais tarde.',
    })
  }
}

export function* updateObjectiveNickname({
  addToast,
  id,
  nickname,
  onSuccess,
}: IUpdateObjectiveNicknameRequest) {
  try {
    yield call(
      patch,
      `${baseURLNamespaceGoal}/goals/${id}?nickname=${nickname}`
    )

    yield put(UpdateObjectiveNicknameSuccess(nickname))

    addToast({
      type: 'success',
      title: 'Apelido atualizado com sucesso.',
    })

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    yield put(UpdateObjectiveNicknameFailure())

    addToast({
      type: 'error',
      description: 'Ocorreu um erro',
      title: 'Tente novamente mais tarde.',
    })
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.GET_REQUEST, getData),
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.DELETE_REQUEST, deleteObjective),
  takeLatest(Types.UPDATE_OBJECTIVE_NICKNAME_REQUEST, updateObjectiveNickname),
  takeLatest(Types.PUT_FUNDS_MOVEMENT_REQUEST, putObjectiveFundsMovement),
])
