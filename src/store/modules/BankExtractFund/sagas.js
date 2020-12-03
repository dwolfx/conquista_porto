import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { buildToast, ToastTypes } from 'store/modules/toastActions'
import { loggerSucess, loggerError } from 'logger'
import { Types } from './types'
import { GetBankExtractFundFailure, GetBankExtractFundSuccess } from './action'

export function* getData({ payload }) {
  const query = new URLSearchParams()
  try {
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
    loggerSucess(
      `${baseURLNamespaceInvest}/fundos/movimentacoes?${query.toString()}`,
      'GET',
      response?.status
    )
  } catch (err) {
    yield put({
      ...GetBankExtractFundFailure(),
      toast: buildToast(JSON.parse(err.message).msg, ToastTypes.error),
    })
    loggerError(
      `${baseURLNamespaceInvest}/fundos/movimentacoes?${query.toString()}`,
      'GET',
      err
    )
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
