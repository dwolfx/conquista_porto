import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import {
  GetConsortiumBuildingDataSuccess,
  GetConsortiumBuildingDataFailure,
} from './action'

function* getData({ cpf, token }) {
  try {
    const response = yield call(
      get,
      `'/consorcios/imovel?Cpf=${cpf}&codigoCanal=1`,
      null,
      token
    )
    yield put(GetConsortiumBuildingDataSuccess(response.data.consorcios))
  } catch (err) {
    yield put(GetConsortiumBuildingDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
