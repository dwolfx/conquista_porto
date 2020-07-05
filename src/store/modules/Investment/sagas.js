import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceAtlas } from 'services/api'

import { GetInvestmentListSuccess, GetInvestmentListFailure } from './action'
import { Types } from './types'

function* getData() {
  try {
    const response = yield call(get, `${baseURLNamespaceAtlas}/fundo/grade`)
    // Normalizar response do backend
    const normalizedResponse = yield response.data.categorias
      .flatMap(item => item)
      .reduce((prev, curr) => [...prev, ...curr.fundos], [])
    yield put(GetInvestmentListSuccess(normalizedResponse))
  } catch (err) {
    yield put(GetInvestmentListFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_LIST_ADD_REQUEST, getData)])
