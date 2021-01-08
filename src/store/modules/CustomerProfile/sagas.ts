import { get, baseURLNamespaceInvest } from 'services/api'
import { all, takeLatest, call, put } from 'redux-saga/effects'
import { loggerSucess, loggerError } from 'logger'

import { GetDataSuccess, GetDataFailure } from './action'
import { Types } from './types'

export function* getData() {
  const getCustomerProfileDataURL = `${baseURLNamespaceInvest}/perfil/dados-cliente`
  try {
    const response = yield call(get, getCustomerProfileDataURL)
    yield put(GetDataSuccess(response.data))
    loggerSucess(getCustomerProfileDataURL, 'GET', response?.status)
  } catch (err) {
    yield put({
      ...GetDataFailure(),
    })
    loggerError(getCustomerProfileDataURL, 'GET', err)
  }
}

export default all([
  takeLatest(Types.CUSTOMER_PROFILE_GET_DATA_REQUEST, getData),
])
