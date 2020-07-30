import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { buildToast, ToastTypes } from 'store/modules/toastActions'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import {
  GetPointsExtractSuccess,
  GetPointsExtractFailure,
  GetPointsBalanceSuccess,
  GetPointsBalanceFailure,
} from './action'

function* getExtract() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/programa-pontos/extrato`
    )

    if (
      response.data.Message &&
      (!response.data.cadastroPessoaProgramaType ||
        !response.data.detalheExtratoOptemaisTypes)
    ) {
      throw Error(response.data.Message.Mensagem)
    }

    const refinedDate = {
      ...response.data,
      detalheExtratoOptemaisTypes: [
        response.data.detalheExtratoOptemaisTypes,
      ].flatMap(point => point),
    }

    yield put(GetPointsExtractSuccess(refinedDate))
  } catch (err) {
    yield put(GetPointsExtractFailure())
  }
}

function* getBalance() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/programa-pontos/consultar-pontos`
    )

    if (
      response.data.Message &&
      (!response.data.consultaPontosResponseType ||
        !response.data.extratoOptemaisType)
    ) {
      throw Error(response.data.Message.Mensagem)
    }

    yield put(GetPointsBalanceSuccess(response.data))
  } catch (err) {
    yield put(GetPointsBalanceFailure())
  }
}

function* postRescuePoints({ payload }) {
  const { onSuccess } = payload
  const RESCUE_POINTS_URL_TOKEN =
    process.env.REACT_APP_BASE_URL_RESCUE_POINTS_TOKEN
  const RESCUE_POINTS_URL_SYSTEM =
    process.env.REACT_APP_BASE_URL_RESCUE_POINTS_SYSTEM
  try {
    const cpf = yield select(state => state.auth.cpf)
    const { data: dataToken } = yield call(
      axios.post,
      `${RESCUE_POINTS_URL_TOKEN}/tokenorg`,
      {
        client_id: 'ORG040PRG1',
        client_secret: 'v9S30OO0C+pHYpw9za3sj3YTPgNwb3J0b2FyZW5h',
      }
    )

    const { data } = yield call(
      axios.post,
      `${RESCUE_POINTS_URL_TOKEN}/tokencatalogo`,
      {
        cod_chave: cpf,
        cpf,
        cod_org: '040',
        cod_prog: '001',
      },
      {
        headers: {
          Authorization: `Bearer ${dataToken.access_token}`,
        },
      }
    )

    onSuccess(`${RESCUE_POINTS_URL_SYSTEM}?token=${data.token}&CodOrg=040`)
  } catch (err) {
    yield put({
      toast: buildToast(
        'Não foi possível realizar o resgate dos pontos neste momento.',
        ToastTypes.error
      ),
    })
  }
}

export default all([
  takeLatest(Types.GET_EXTRACT_REQUEST, getExtract),
  takeLatest(Types.GET_BALANCE_REQUEST, getBalance),
  takeLatest(Types.POST_RESCUE_POINTS_REQUEST, postRescuePoints),
])
