import { all, takeLatest, call, put } from 'redux-saga/effects'
import saldoMin from 'components/Solutions/Investments/FundsInfo/TransactionsSection/funds-db'

// eslint-disable-next-line import/no-cycle
import { get } from 'services/api'

import {
  GetInvestmentDetailsSuccess,
  GetInvestmentDetailsFailure,
} from './action'
import { Types } from './types'

function* getData(action) {
  try {
    const response = yield call(
      get,
      `/invest/fundos/${action.fundId}?codigoCanal=0`
    )

    if (response.data) {
      response.data.saldo_minimo = saldoMin[action.fundId]
        ? saldoMin[action.fundId]
        : '-'
    }

    yield put(GetInvestmentDetailsSuccess(response.data))
  } catch (err) {
    yield put(GetInvestmentDetailsFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_DETAILS_ADD_REQUEST, getData)])
