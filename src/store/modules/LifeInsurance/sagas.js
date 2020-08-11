import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import {
  GetLifeInsuranceDataSuccess,
  GetLifeInsuranceDataFailure,
} from './action'

export function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/produtos/vida?codigoCanal=1&tipoSeguro=VIDA`
    )

    let responseData = response.data

    if (response.data.Message && !responseData.ProdutosVida) {
      responseData = []
    }

    try {
      responseData = [responseData.ProdutosVida.SeguroVida].flatMap(
        product => product
      )
    } catch (err) {
      responseData = []
    }

    yield put(GetLifeInsuranceDataSuccess(responseData))
  } catch (err) {
    yield put(GetLifeInsuranceDataFailure())
  }
}

export default all([takeLatest(Types.GET_DATA_REQUEST, getData)])
