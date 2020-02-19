import { all, takeLatest, call, put } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { get } from 'services/api'
import { Types } from './types'
import {
  GetTripInsuranceDataSuccess,
  GetTripInsuranceDataFailure,
} from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `/invest/produtos/vida?cpfCnpj=${cpf}&codigoCanal=1&tipoSeguro=VIAGEM`
    )
    yield put(GetTripInsuranceDataSuccess(response.data))
  } catch (err) {
    yield put(GetTripInsuranceDataFailure())
  }
}

export default all([takeLatest(Types.GET_DATA_REQUEST, getData)])
