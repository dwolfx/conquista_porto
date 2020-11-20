import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import { Types, IResponse } from './types'
import * as a from './action'

export function* getOccupation() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cartoes/profissoes`
    )

    let responseData: IResponse = response.data
    if(!responseData) {
      throw new Error('API request error')
    }

    yield put(a.GetCreditCardOccupationSuccess(responseData))
  } catch (err) {
    console.error(err)
    yield put(a.GetCreditCardOccupationFailure())
  }
}

export default all([takeLatest(Types.CREDIT_CARD_OCCUPATION_REQUEST, getOccupation)])
