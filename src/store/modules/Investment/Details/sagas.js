import { all, takeLatest, call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceAtlas } from 'services/api'

import {
  GetInvestmentDetailsSuccess,
  GetInvestmentDetailsFailure,
} from './action'
import { Types } from './types'

function* getData(action) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceAtlas}/fundo/detalhes/${action.fundId}`
    )

    yield put(GetInvestmentDetailsSuccess(response.data))
  } catch (err) {
    yield put(GetInvestmentDetailsFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_DETAILS_ADD_REQUEST, getData)])
