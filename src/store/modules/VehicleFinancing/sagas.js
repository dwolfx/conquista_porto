import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetVehicleFinancingSuccess,
  GetVehicleFinancingFailure,
} from './action'

function* getData({ cpf, token }) {
  try {
    const response = yield call(
      get,
      `/produtos/financiamento?cpf=${cpf}&codigoCanal=0`,
      null,
      token
    )
    if (
      response.data.TipoCritica ||
      response.data.Mensagem ||
      response.data.mensagem
    ) {
      yield put(GetVehicleFinancingFailure())
    } else {
      yield put(GetVehicleFinancingSuccess(response.data))
    }
  } catch (err) {
    yield put(GetVehicleFinancingFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
