import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { loggerSucess, loggerError } from 'logger'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'

export function* getData() {
  const getBankDataURL = `${baseURLNamespaceInvest}/conta/dados?codigoCanal=0`
  try {
    const response = yield call(get, getBankDataURL)

    if (!response.data.DadosContaPortoSeguro) {
      loggerError(getBankDataURL, 'GET', `'DadosContaPortoSeguro' is empty`)
      throw Error()
    }
    yield put(GetDataSuccess(response.data))
    loggerSucess(getBankDataURL, 'GET', response?.status)
  } catch (err) {
    yield put(GetDataFailure())
    loggerError(getBankDataURL, 'GET', err)
  }
}

export default all([takeLatest(Types.BANK_DATA_GET_DATA_REQUEST, getData)])
