import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import {
  GetLifeInsuranceDataSuccess,
  GetLifeInsuranceDataFailure,
} from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/produtos/vida?codigoCanal=1&tipoSeguro=VIDA`
    )

    let responseData = response.data

    if (responseData.Message && !responseData.ProdutosVida) {
      responseData = []
    }

    yield put(GetLifeInsuranceDataSuccess(responseData.ProdutosVida || []))
  } catch (err) {
    yield put(GetLifeInsuranceDataFailure())
  }
}

export default all([takeLatest(Types.GET_DATA_REQUEST, getData)])
