import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import { GetPointsDataSuccess, GetPointsDataFailure } from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/programa-pontos/extrato?cpf=${cpf}`
    )

    if (response.data.Message) {
      throw Error(response.data.Message.Mensagem)
    }

    yield put(GetPointsDataSuccess(response.data))
  } catch (err) {
    yield put(GetPointsDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
