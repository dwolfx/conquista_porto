import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { buildToast, ToastTypes } from 'store/modules/toastActions'

import { Types } from './types'
import { GetBankExtractSuccess, GetBankExtractFailure } from './action'

function* getData({ payload: { tipoFiltro, dataInicial, dataFinal }, cpf }) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/conta/extrato?cpfCnpj=${cpf}&tipoFiltro=${tipoFiltro}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`
    )
    yield put(GetBankExtractSuccess(response.data))
  } catch (err) {
    yield put({
      ...GetBankExtractFailure(),
      toast: buildToast(err.message, ToastTypes.error),
    })
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
