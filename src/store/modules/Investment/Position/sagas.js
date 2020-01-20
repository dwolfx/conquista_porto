import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'

import { GetPositionDataSuccess, GetPositionDataFailure } from './action'
import { Types } from './types'

function* getData() {
  try {
    const response = yield call(get, '/cotistas/posicao?cpf=63974509291')
    yield put(GetPositionDataSuccess(response.data))
  } catch (err) {
    yield put(GetPositionDataFailure())
  }
}

export default all([takeLatest(Types.ADD_REQUEST, getData)])
