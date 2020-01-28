import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetVehicleFinancingSuccess,
  GetVehicleFinancingFailure,
} from './action'

// eslint-disable-next-line no-unused-vars
function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      // `/produtos/financiamento?cpf=${cpf}&codigoCanal=0`,
      '/produtos/financiamento?cpf=33244452809&codigoCanal=0'
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
