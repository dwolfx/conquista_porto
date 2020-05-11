import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import saldoMin from 'components/Solutions/Investments/FundsInfo/TransactionsSection/funds-db'

import { get, baseURLNamespaceInvest } from 'services/api'
import { getInvestmentList } from './selectors'

import {
  GetInvestmentDetailsSuccess,
  GetInvestmentDetailsFailure,
} from './action'
import { Types } from './types'

function* getData(action) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/fundos/${action.fundId}?codigoCanal=0`
    )

    const investmentList = yield select(getInvestmentList)

    const categories = investmentList.data[0]

    let name = ''
    if (action.fundId && categories)
      categories.forEach(category => {
        const filteredResult = category.fundos.filter(
          fundo => fundo.id_fundo === action.fundId
        )
        if (filteredResult.length > 0) {
          name = category.nome_categoria
        }
      })

    let richedData = { ...response.data }
    if (response.data) {
      richedData = {
        ...richedData,
        saldo_minimo: saldoMin[action.fundId] ? saldoMin[action.fundId] : '-',
        categoria: name,
      }
    }

    yield put(GetInvestmentDetailsSuccess(richedData))
  } catch (err) {
    yield put(GetInvestmentDetailsFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_DETAILS_ADD_REQUEST, getData)])
