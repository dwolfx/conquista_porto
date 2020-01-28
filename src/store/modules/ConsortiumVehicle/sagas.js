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

// eslint-disable-next-line no-unused-vars
function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      // `/consorcios/auto?cpf=${cpf}&codigoCanal=1`
      `/consorcios/auto?cpf=68826796220&codigoCanal=1`
    )
    yield put(GetConsortiumVehicleDataSuccess(addId(response.data.consorcios)))
  } catch (err) {
    yield put(GetConsortiumVehicleDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
