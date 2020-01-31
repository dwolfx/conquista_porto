import { all, takeLatest, call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
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

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `/consorcios/auto?cpf=${cpf}&codigoCanal=1`
    )
    yield put(GetConsortiumVehicleDataSuccess(addId(response.data.consorcios)))
  } catch (err) {
    yield put(GetConsortiumVehicleDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
