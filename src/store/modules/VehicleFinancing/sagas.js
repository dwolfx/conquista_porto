import { all, takeLatest, call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { get } from 'services/api'
import { Types } from './types'
import {
  GetVehicleFinancingSuccess,
  GetVehicleFinancingFailure,
} from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `/financiamentos/auto?cpf=${cpf}&codigoCanal=0`
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
