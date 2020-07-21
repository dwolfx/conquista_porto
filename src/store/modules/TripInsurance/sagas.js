import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestPortovida } from 'services/api'
import { Types } from './types'
import {
  GetTripInsuranceDataSuccess,
  GetTripInsuranceDataFailure,
} from './action'


function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestPortovida}/produto?codigo-canal=0&tipo-seguro=VIAGEM`
    )

    let responseData = response.data

    if (response?.data?.Mensagem) {
      responseData = []
    }

    yield put(GetTripInsuranceDataSuccess(responseData.ProdutosViagem || []))
  } catch (err) {
    yield put(GetTripInsuranceDataFailure())
  }
}

export default all([takeLatest(Types.GET_DATA_REQUEST, getData)])
