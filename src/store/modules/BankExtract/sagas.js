import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetBankExtractSuccess, GetBankExtractFailure } from './action'

function* getData(action) {
  const { filter, startDate, endDate } = action.payload

  try {
    const response = yield call(
      get,
      `/conta/extrato?cpfCnpj=68826796220&tipoFiltro=${filter}&dataInicial=${startDate}&dataFinal=${endDate}`
    )
    yield put(GetBankExtractSuccess(response.data))
  } catch (err) {
    yield put(GetBankExtractFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
