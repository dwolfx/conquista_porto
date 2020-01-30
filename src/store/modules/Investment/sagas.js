import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'

import { GetInvestmentListSuccess, GetInvestmentListFailure } from './action'
import { Types } from './types'

function* getData({ token }) {
  try {
    const response = yield call(get, '/fundos', null, token)
    yield put(GetInvestmentListSuccess(response.data))
  } catch (err) {
    yield put(GetInvestmentListFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_LIST_ADD_REQUEST, getData)])
