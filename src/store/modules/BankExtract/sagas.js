import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'

function* getData(action) {
  const { filter, startDate, endDate } = action.payload

  try {
    const response = yield call(
      get,
      // '/conta/extrato?cpfCnpj=33244452809&tipoFiltro=0&dataInicial=2019-01-30T16:33:10.514Z&dataFinal=2019-12-30T16:33:10.514Z'
      `/conta/extrato?cpfCnpj=33244452809&tipoFiltro=${filter}&dataInicial=${startDate}&dataFinal=${endDate}`
    )
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
