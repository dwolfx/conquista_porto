import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import { loggerSucess, loggerError } from 'logger'
import { Types, IResponse } from './types'
import * as a from './action'

export function* getOccupation() {
  const getOccupationURL = `${baseURLNamespaceInvestAws}/cartoes/profissoes`
  try {
    const response = yield call(get, getOccupationURL)

    let responseData: IResponse = response.data
    if (!responseData) {
      loggerError(getOccupationURL, 'GET', `'responseData' is empty`)

      throw new Error('API request error')
    }

    yield put(a.GetCreditCardOccupationSuccess(responseData))
    loggerSucess(getOccupationURL, 'GET', response?.status)
  } catch (err) {
    console.error(err)
    yield put(a.GetCreditCardOccupationFailure())
    loggerError(getOccupationURL, 'GET', err)
  }
}

export default all([
  takeLatest(Types.CREDIT_CARD_OCCUPATION_REQUEST, getOccupation),
])
