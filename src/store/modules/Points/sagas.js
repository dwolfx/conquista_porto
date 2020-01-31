import { all, takeLatest, call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { get } from 'services/api'
import { Types } from './types'
import { GetPointsDataSuccess, GetPointsDataFailure } from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(get, `/programa-pontos/extrato?cpf=${cpf}`)
    yield put(GetPointsDataSuccess(response.data))
  } catch (err) {
    yield put(GetPointsDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
