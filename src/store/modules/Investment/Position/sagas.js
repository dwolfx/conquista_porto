import { all, takeLatest, call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { get } from 'services/api'

import { GetPositionDataSuccess, GetPositionDataFailure } from './action'
import { Types } from './types'

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `invest/cotistas/posicao?cpf=${cpf}&codigoCanal=0`
    )

    if (response && response.data.Mensagem) {
      yield put(GetPositionDataFailure())
      console.error('Error: ', response.data.Mensagem)
    } else {
      yield put(GetPositionDataSuccess(response.data))
    }
  } catch (err) {
    yield put(GetPositionDataFailure())
  }
}

export default all([takeLatest(Types.ADD_REQUEST, getData)])
