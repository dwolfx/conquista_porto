import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import {
  GetTripInsuranceDataSuccess,
  GetTripInsuranceDataFailure,
} from './action'

export function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/produtos/vida?codigoCanal=1&tipoSeguro=VIAGEM`
    )

    let responseData = response.data

    if (response.data.Mensagem) {
      responseData = []
    }

    try {
      responseData = [responseData.ProdutosViagem.Viagem].flatMap(
        product => product
      )
    } catch (err) {
      responseData = []
    }

    yield put(GetTripInsuranceDataSuccess(responseData))
  } catch (err) {
    yield put(GetTripInsuranceDataFailure())
  }
}

export default all([takeLatest(Types.GET_DATA_REQUEST, getData)])
