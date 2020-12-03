import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { loggerSucess, loggerError } from 'logger'
import { Types } from './types'
import {
  GetConsortiumBuildingDataSuccess,
  GetConsortiumBuildingDataFailure,
} from './action'

export function* getData() {
  const getConsortiumBuildingDataURL = `${baseURLNamespaceInvest}/consorcios/imovel?codigoCanal=1`
  try {
    const response = yield call(get, getConsortiumBuildingDataURL)

    let responseData = response.data

    if (response.data.Mensagem) {
      responseData = []
    }

    yield put(GetConsortiumBuildingDataSuccess(responseData.consorcios || []))
    loggerSucess(getConsortiumBuildingDataURL, 'GET', response?.status)
  } catch (err) {
    yield put(GetConsortiumBuildingDataFailure())
    loggerError(getConsortiumBuildingDataURL, 'GET', err)
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
