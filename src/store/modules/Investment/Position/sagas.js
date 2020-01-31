import { all, takeLatest, call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { get } from 'services/api'

import { GetPositionDataSuccess, GetPositionDataFailure } from './action'
import { Types } from './types'

function* getData({ cpf }) {
  try {
    const response = yield call(get, `/cotistas/posicao?cpf=${cpf}`)
    yield put(GetPositionDataSuccess(response.data))
  } catch (err) {
    yield put(GetPositionDataFailure())
  }
}

export default all([takeLatest(Types.ADD_REQUEST, getData)])
