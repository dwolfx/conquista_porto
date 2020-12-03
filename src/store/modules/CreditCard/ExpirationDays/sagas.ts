import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import { loggerSucess, loggerError } from 'logger'
import { Types, ICreditCardExpirationDays } from './types'
import * as a from './action'

export function* getExpirationDays() {
  const getExpirationDaysURL = `${baseURLNamespaceInvestAws}/cartoes/dia/vencimento?codigo_canal=14`
  try {
    const response = yield call(get, getExpirationDaysURL)

    let responseData: ICreditCardExpirationDays = response.data

    responseData = {
      ...responseData,
      visa: responseData.bandeiras.filter(
        bandeira => bandeira.codBandeira === '1'
      ),
      mastercard: responseData.bandeiras.filter(
        bandeira => bandeira.codBandeira === '2'
      ),
    }

    yield put(a.GetCreditCardExpirationDaysSuccess(responseData))
    loggerSucess(getExpirationDaysURL, 'GET', response?.status)
  } catch (err) {
    yield put(a.GetCreditCardExpirationDaysFailure())
    loggerError(getExpirationDaysURL, 'GET', err)
  }
}

export default all([
  takeLatest(Types.CREDIT_CARD_EXPIRATION_DAYS_REQUEST, getExpirationDays),
])
