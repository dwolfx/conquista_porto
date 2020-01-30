import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetConsolidatedPositionDataSuccess,
  GetConsolidatedPositionDataFailure,
} from './action'

function* getData({ cpf, token }) {
  try {
    const response = yield call(
      get,
      `/cotistas/posicao-consolidada?cpf=${cpf}`,
      null,
      token
    )
    yield put(GetConsolidatedPositionDataSuccess(response.data))
  } catch (err) {
    yield put(GetConsolidatedPositionDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
