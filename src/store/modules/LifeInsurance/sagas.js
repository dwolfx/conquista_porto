import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestPortovida } from 'services/api'
import { Types } from './types'
import {
  GetLifeInsuranceDataSuccess,
  GetLifeInsuranceDataFailure,
} from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestPortovida}/produto?codigo-canal=0&tipo-seguro=VIDA`
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
