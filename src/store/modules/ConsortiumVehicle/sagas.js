import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { loggerSucess, loggerError } from 'logger'
import { Types } from './types'
import {
  GetConsortiumVehicleDataSuccess,
  GetConsortiumVehicleDataFailure,
} from './action'

function addId(consorcios) {
  return consorcios.map((consorcio, index) => ({
    ...consorcio,
    Id: index,
  }))
}

export function* getData() {
  const getConsortiumVehicleDataURL = `${baseURLNamespaceInvest}/consorcios/auto?codigoCanal=1`
  try {
    const response = yield call(get, getConsortiumVehicleDataURL)

    let responseData = []

    if (!response.data.Mensagem) {
      responseData = addId(response.data.consorcios)
    }

    yield put(GetConsortiumVehicleDataSuccess(responseData))
    loggerSucess(getConsortiumVehicleDataURL, 'GET', response?.status)
  } catch (err) {
    yield put(GetConsortiumVehicleDataFailure())
    loggerError(getConsortiumVehicleDataURL, 'GET', err)
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
