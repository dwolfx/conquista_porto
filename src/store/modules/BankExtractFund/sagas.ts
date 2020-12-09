import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { buildToast, ToastTypes } from 'store/modules/toastActions'
import { Types, APLICACAO, OUTROS, COME_COTAS, RESGATE } from './types'
import { GetBankExtractFundFailure, GetBankExtractFundSuccess } from './action'

export function* getData({ payload }: any) {
  try {
    const query = new URLSearchParams()
    Object.keys(payload).forEach(key => {
      if (payload[key]) {
        query.append(key, payload[key])
      }
    })

    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/fundos/movimentacoes?${query.toString()}`
    )

    let newResponse = response.data[0]

    const getType = (id: number) => {
      if (id === COME_COTAS) {
        return 'COME-COTAS'
      }

      if (Object.values(APLICACAO).some(value => value === id)) {
        return 'APLICAÇÃO'
      }

      if (Object.values(RESGATE).some(value => value === id)) {
        return 'RESGATE'
      }

      if (Object.values(OUTROS).some(value => value === id)) {
        return 'OUTROS'
      }
    }
    if (newResponse.operacoes === '') {
      newResponse = {
        ...newResponse,
        operacoes: {
          operacao: [],
        },
      }
    } else if (!Array.isArray(newResponse.operacoes.operacao)) {
      newResponse = {
        ...newResponse,
        operacoes: {
          operacao: [newResponse.operacoes.operacao].map(
            (operacaoItem: any) => ({
              ...operacaoItem,
              data: operacaoItem.data_operacao,
              tipoOperacao: operacaoItem.tipo_operacao,
              tipo: getType(Number(operacaoItem.tipo_movimentacao_operacao)),
              valor: operacaoItem.valor_bruto,
            })
          ),
        },
      }
    } else {
      newResponse = {
        operacoes: {
          operacao: newResponse?.operacoes?.operacao.map(
            (operacaoItem: any) => ({
              ...operacaoItem,
              data: operacaoItem.data_operacao,
              tipoOperacao: operacaoItem.tipo_operacao,
              tipo: getType(Number(operacaoItem.tipo_movimentacao_operacao)),
              valor: operacaoItem.valor_bruto,
            })
          ),
        },
      }
    }
    yield put(GetBankExtractFundSuccess(newResponse))
  } catch (err) {
    yield put({
      ...GetBankExtractFundFailure(),
      toast: buildToast(JSON.parse(err.message).msg, ToastTypes.error),
    })
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
