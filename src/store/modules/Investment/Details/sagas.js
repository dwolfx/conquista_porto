import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'

import {
  GetInvestmentDetailsSuccess,
  GetInvestmentDetailsFailure,
} from './action'
import { Types } from './types'

function* getData(action) {
  try {
    const response = yield call(get, `/fundos/${action.fundId}?codigoCanal=0`)
    yield put(GetInvestmentDetailsSuccess(response.data))
  } catch (err) {
    yield put(GetInvestmentDetailsFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_DETAILS_ADD_REQUEST, getData)])
