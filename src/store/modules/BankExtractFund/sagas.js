import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { buildToast, ToastTypes } from 'store/modules/toastActions'
import { Types } from './types'
import { GetBankExtractFundFailure, GetBankExtractFundSuccess } from './action'

function* getData({ payload, cpf }) {
  try {
    const query = new URLSearchParams()
    query.set('cpfCnpj', cpf)
    Object.keys(payload).forEach(key => {
      if (payload[key]) {
        query.append(key, payload[key])
      }
    })

    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/fundos/movimentacoes?${query.toString()}`
    )
    yield put(GetBankExtractFundSuccess(response.data))
  } catch (err) {
    yield put({
      ...GetBankExtractFundFailure(),
      toast: buildToast(err.message, ToastTypes.error),
    })
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
