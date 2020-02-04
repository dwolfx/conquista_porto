import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetLifeInsuranceDataSuccess,
  GetLifeInsuranceDataFailure,
} from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `/produtos/vida?cpfCnpj=${cpf}&codigoCanal=1&tipoSeguro=VIDA`
    )
    yield put(GetLifeInsuranceDataSuccess(response.data))
  } catch (err) {
    yield put(GetLifeInsuranceDataFailure())
  }
}

export default all([takeLatest(Types.GET_DATA_REQUEST, getData)])
