import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceAtlas } from 'services/api'

import {
  GetComparativeProfitabilityDataSuccess,
  GetComparativeProfitabilityDataFailure,
} from './action'
import { Types } from './types'

interface IPayload {
  fundId: string
  type: string
}

function* getData({ fundId }: IPayload) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceAtlas}/fundo/rentabilidade/comparativo/${fundId}`
    )

    let responseData = null

    if (response || response.data || !response.data.Mensagem) {
      responseData = response.data
    }

    yield put(GetComparativeProfitabilityDataSuccess(responseData))
  } catch (err) {
    yield put(GetComparativeProfitabilityDataFailure())
  }
}

export default all([
  takeLatest(Types.COMPARATIVE_PROFITABILITY_GET_DATA_REQUEST, getData),
])
