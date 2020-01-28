import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetPointsDataSuccess, GetPointsDataFailure } from './action'

// eslint-disable-next-line no-unused-vars
function* getData({ cpf }) {
  try {
    const response = yield call(get, '/programa-pontos/extrato?cpf=33244452809')
    // const response = yield call(get, `/programa-pontos/extrato?cpf=${cpf}`)
    yield put(GetPointsDataSuccess(response.data))
  } catch (err) {
    yield put(GetPointsDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
