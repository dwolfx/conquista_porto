import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetTripInsuranceDataSuccess,
  GetTripInsuranceDataFailure,
} from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      '/produtos/vida?cpfCnpj=33244452809&codigoCanal=1&tipoSeguro=VIAGEM'
    )
    yield put(GetTripInsuranceDataSuccess(response.data))
  } catch (err) {
    yield put(GetTripInsuranceDataFailure())
  }
}

export default all([takeLatest(Types.GET_DATA_REQUEST, getData)])
