import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetConsolidatedPositionDataSuccess,
  GetConsolidatedPositionDataFailure,
} from './action'

// eslint-disable-next-line no-unused-vars
function* getData({ cpf }) {
  try {
    // const response = yield call(get, `/cotistas/posicao-consolidada?cpf=${cpf}`)
    const response = yield call(
      get,
      '/cotistas/posicao-consolidada?cpf=33244452809'
    )
    yield put(GetConsolidatedPositionDataSuccess(response.data))
  } catch (err) {
    yield put(GetConsolidatedPositionDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
