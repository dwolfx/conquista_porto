import { all, takeLatest, call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { get } from 'services/api'
import { Types } from './types'
import {
  GetConsolidatedPositionDataSuccess,
  GetConsolidatedPositionDataFailure,
} from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(get, `/cotistas/posicao-consolidada?cpf=${cpf}`)
    yield put(GetConsolidatedPositionDataSuccess(response.data))
  } catch (err) {
    yield put(GetConsolidatedPositionDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
