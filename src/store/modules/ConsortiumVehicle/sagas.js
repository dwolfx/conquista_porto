import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetConsortiumVehicleDataSuccess,
  GetConsortiumVehicleDataFailure,
} from './action'

function addId(consorcios) {
  return consorcios.map((consorcio = {}, index) => ({
    ...consorcio,
    Id: index,
  }))
}

function* getData({ cpf, token }) {
  try {
    const response = yield call(
      get,
      `/consorcios/auto?cpf=${cpf}&codigoCanal=1`,
      null,
      token
    )
    yield put(GetConsortiumVehicleDataSuccess(addId(response.data.consorcios)))
  } catch (err) {
    yield put(GetConsortiumVehicleDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
