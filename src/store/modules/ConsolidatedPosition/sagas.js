import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import {
  GetConsolidatedPositionDataSuccess,
  GetConsolidatedPositionDataFailure,
} from './action'

function* getData({ cpf }) {
  try {
    const { response, err } = yield call(
      get,
      `${baseURLNamespaceInvest}/cotistas/posicao-consolidada?cpf=${cpf}`
    )
    if (err || response.status !== 200) {
      yield put(GetConsolidatedPositionDataFailure())
    } else {
      yield put(GetConsolidatedPositionDataSuccess(response.data))
    }
  } catch (err) {
    yield put(GetConsolidatedPositionDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
