import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { buildToast, ToastTypes } from 'store/modules/toastActions'

import { loggerSucess, loggerError } from 'logger'
import { Types } from './types'
import { GetBankExtractSuccess, GetBankExtractFailure } from './action'

export function* getData({
  payload: { tipoFiltro, dataInicial, dataFinal },
}: any) {
  const getBankExtractURL = `${baseURLNamespaceInvest}/conta/extrato?tipoFiltro=${tipoFiltro}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`
  try {
    const response = yield call(get, getBankExtractURL)
    yield put(GetBankExtractSuccess(response.data))
    loggerSucess(getBankExtractURL, 'GET', response?.status)
    const newResponse = {
      data: {
        conta: { ...response.data?.conta },
        transacoes: {
          transacao: response.data?.transacoes?.transacao.map((res: any) => ({
            ...res,
            tipo: res.tipo === 'APLICAÇÃO' ? 'Entrada' : 'Retirada',
            valor: res.valor.replace('-', ''),
          })),
        },
      },
    }

    yield put(GetBankExtractSuccess(newResponse.data))
  } catch (err) {
    yield put({
      ...GetBankExtractFailure(),
      toast: buildToast(JSON.parse(err.message).msg, ToastTypes.error),
    })
    loggerError(getBankExtractURL, 'GET', err)
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
