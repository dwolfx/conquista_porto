import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'

import { GetInvestmentListSuccess, GetInvestmentListFailure } from './action'
import { Types } from './types'

function* getData() {
  try {
    const response = yield call(get, `${baseURLNamespaceInvest}/fundos`)
    yield put(GetInvestmentListSuccess(response.data))
  } catch (err) {
    yield put(GetInvestmentListFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_LIST_ADD_REQUEST, getData)])
