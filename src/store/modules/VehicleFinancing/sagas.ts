import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import {
  GetVehicleFinancingSuccess,
  GetVehicleFinancingFailure,
} from './action'

export function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/financiamentos/auto?codigoCanal=0`
    )
    let responseData = response.data

    if (response.data.Mensagem) {
      responseData = []
    }

    yield put(GetVehicleFinancingSuccess(responseData))
  } catch (err) {
    yield put(GetVehicleFinancingFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
