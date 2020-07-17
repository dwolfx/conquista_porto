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
