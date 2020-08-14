import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import { get, baseURLNamespaceAtlas } from 'services/api'

import {
  GetInvestmentDetailsSuccess,
  GetInvestmentDetailsFailure,
} from './action'
import { Types } from './types'
import { getInvestmentList } from './selectors'

export function* getData(action: any) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceAtlas}/fundo/detalhes/${action.fundId}`
    )

    const investmentList = yield select(getInvestmentList)
    let name = ''
    if (action.fundId && investmentList.data.length > 0) {
      const foundResult = investmentList.data.find(
        (fundo: any) => fundo.id_carteira === action.fundId
      )
      name = foundResult.categoria_arena
    }
    let richedData = { ...response.data }
    if (response.data) {
      richedData = {
        ...richedData,
        categoria: name,
      }
    }

    yield put(GetInvestmentDetailsSuccess(richedData))
  } catch (err) {
    yield put(GetInvestmentDetailsFailure())
  }
}

export default all([takeLatest(Types.INVESTMENT_DETAILS_ADD_REQUEST, getData)])
