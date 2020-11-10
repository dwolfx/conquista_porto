import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
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
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/consorcios/auto?codigoCanal=1`
    )

    let responseData = []

    if (!response.data.Mensagem) {
      responseData = addId(response.data.consorcios)
    }

    yield put(GetConsortiumVehicleDataSuccess(responseData))
  } catch (err) {
    yield put(GetConsortiumVehicleDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
