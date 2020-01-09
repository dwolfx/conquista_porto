import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetPointsDataSuccess, GetPointsDataFailure } from './action'

function* getData() {
  try {
    const response = yield call(get, '/programa-pontos/extrato?cpf=32036703801')
    yield put(GetPointsDataSuccess(response.data))
  } catch (err) {
    yield put(GetPointsDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
