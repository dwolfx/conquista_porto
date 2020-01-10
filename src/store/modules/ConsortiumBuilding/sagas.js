import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetConsortiumBuildingDataSuccess,
  GetConsortiumBuildingDataFailure,
} from './action'

function* getData() {
  try {
    const response = yield call(
      get,
      '/consorcios/imovel?Cpf=36441112604&codigoCanal=1'
    )
    yield put(GetConsortiumBuildingDataSuccess(response.data.consorcios))
  } catch (err) {
    yield put(GetConsortiumBuildingDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
