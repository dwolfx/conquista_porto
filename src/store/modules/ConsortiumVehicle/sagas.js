import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetConsortiumVehicleDataSuccess,
  GetConsortiumVehicleDataFailure,
} from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      '/consorcios/auto?cpf=33244452809&codigoCanal=1'
    )
    yield put(GetConsortiumVehicleDataSuccess(response.data.consorcios))
  } catch (err) {
    yield put(GetConsortiumVehicleDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
