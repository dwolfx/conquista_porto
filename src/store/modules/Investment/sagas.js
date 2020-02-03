import { all, takeLatest, call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { get } from 'services/api'

import { GetInvestmentListSuccess, GetInvestmentListFailure } from './action'
import { Types } from './types'

function* getData() {
  try {
    const response = yield call(get, '/fundos')
    yield put(GetInvestmentListSuccess(response.data))
  } catch (err) {
    yield put(GetInvestmentListFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_LIST_ADD_REQUEST, getData)])
