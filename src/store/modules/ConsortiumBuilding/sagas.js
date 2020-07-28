import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import {
  GetConsortiumBuildingDataSuccess,
  GetConsortiumBuildingDataFailure,
} from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/consorcios/imovel?codigoCanal=1`
    )

    let responseData = response.data

    if (response.data.Mensagem) {
      responseData = []
    }

    yield put(GetConsortiumBuildingDataSuccess(responseData.consorcios || []))
  } catch (err) {
    yield put(GetConsortiumBuildingDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
