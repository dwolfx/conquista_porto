import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceAtlas } from 'services/api'

import {
  GetLastTransactionDataSuccess,
  GetLastTransactionDataFailure,
} from './action'
import { Types } from './types'

function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceAtlas}/cotista/ultimas/movimentacoes`
    )

    let responseData = null

    if (response || response.data || !response.data.Mensagem) {
      responseData = response.data
    }

    yield put(GetLastTransactionDataSuccess(responseData))
  } catch (err) {
    yield put(GetLastTransactionDataFailure())
  }
}

export default all([
  takeLatest(Types.LAST_TRANSACTION_GET_DATA_REQUEST, getData),
])
