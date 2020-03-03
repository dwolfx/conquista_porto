import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import {
  GetTripInsuranceDataSuccess,
  GetTripInsuranceDataFailure,
} from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/produtos/vida?cpfCnpj=${cpf}&codigoCanal=1&tipoSeguro=VIAGEM`
    )
    yield put(GetTripInsuranceDataSuccess(response.data))
  } catch (err) {
    yield put(GetTripInsuranceDataFailure())
  }
}

export default all([takeLatest(Types.GET_DATA_REQUEST, getData)])
