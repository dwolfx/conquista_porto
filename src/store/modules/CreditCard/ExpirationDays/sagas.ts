import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import { Types, ICreditCardExpirationDays } from './types'
import * as a from './action'

export function* getExpirationDays() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cartoes/dia/vencimento?codigo_canal=14`
    )

    let responseData: ICreditCardExpirationDays = response.data

    responseData = {
      ...responseData,
      visa: responseData.bandeiras.filter(bandeira => bandeira.codBandeira === '1'),
      mastercard: responseData.bandeiras.filter(bandeira => bandeira.codBandeira === '2')
    }

    yield put(a.GetCreditCardExpirationDaysSuccess(responseData))
  } catch (err) {
    yield put(a.GetCreditCardExpirationDaysFailure())
  }
}

export default all([takeLatest(Types.CREDIT_CARD_EXPIRATION_DAYS_REQUEST, getExpirationDays)])
