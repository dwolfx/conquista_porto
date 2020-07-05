import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceAtlas } from 'services/api'

import { GetIncomesDataSuccess, GetIncomesDataFailure } from './action'
import { Types } from './types'

interface IPayload {
  fundId: number
  type: string
}

function* getData({ fundId }: IPayload) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceAtlas}/fundo/rentabilidade/${fundId}`
    )

    let responseData = []

    if (response || response.data || !response.data.Mensagem) {
      responseData = response.data
    }

    yield put(GetIncomesDataSuccess(responseData))
  } catch (err) {
    yield put(GetIncomesDataFailure())
  }
}

export default all([takeLatest(Types.INCOME_GET_DATA_REQUEST, getData)])
