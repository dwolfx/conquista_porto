import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import {
  GetPointsExtractSuccess,
  GetPointsExtractFailure,
  GetPointsBalanceSuccess,
  GetPointsBalanceFailure,
  SetRedeemPointsLoading,
} from './action'

export function* getExtract() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/programa-pontos/extrato`
    )

    let refinedDate = null

    if (response.data.Message && !response.data.detalheExtratoOptemaisTypes) {
      if (
        response.data.Message &&
        response.data.Message.Mensagem !== 'SUCESSO'
      ) {
        throw Error(response.data.Message.Mensagem)
      }
    } else {
      refinedDate = {
        ...response.data,
        detalheExtratoOptemaisTypes: [
          response.data.detalheExtratoOptemaisTypes,
        ].flatMap(point => point),
      }
    }

    yield put(GetPointsExtractSuccess(refinedDate))
  } catch (err) {
    yield put(GetPointsExtractFailure())
  }
}

export function* getBalance() {
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

export function* postRescuePoints({ payload }: any) {
  const { onSuccess, onErrorToast } = payload

  yield put(SetRedeemPointsLoading(true))

  try {
    const { cpf } = yield select(state => state.auth)

    const configAccessToken = {
      headers: {
        Authorization:
          process.env.REACT_APP_SENSEDIA_AUTHORIZATION_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    }

    const {
      data: { access_token: token },
    } = yield call(
      axios.post,
      `${process.env.REACT_APP_SENSEDIA_URL_TOKEN}`,
      {
        grant_type: 'client_credentials',
      },
      configAccessToken
    )

    const configAuthenticationToken = {
      headers: {
        client_id: process.env.REACT_APP_SENSEDIA_CLIENT_ID,
        access_token: token,
        'Content-Type': 'application/json',
      },
    }
    const {
      data: { accessToken },
    } = yield call(
      axios.post,
      `${process.env.REACT_APP_SENSEDIA_URL_LOGIN_TOKEN}`,
      {
        cpf,
        sourceSystem: 'Conquista',
      },
      configAuthenticationToken
    )

    const configAuthenticationSession = {
      headers: {
        client_id: process.env.REACT_APP_SENSEDIA_CLIENT_ID,
        access_token: token,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
    const {
      data: { authorizationUrl },
    } = yield call(
      axios.post,
      `${process.env.REACT_APP_SENSEDIA_URL_LOGIN_SESSAO}`,
      {
        cpf,
        sourceSystem: 'Conquista',
      },
      configAuthenticationSession
    )

    onSuccess(
      `${process.env.REACT_APP_SENSEDIA_URL_LOGIN_PORTAL}/${authorizationUrl}`
    )
  } catch (err) {
    onErrorToast({
      type: 'error',
      description:
        'Não foi possível realizar o resgate dos pontos neste momento.',
      title: 'Erro ao processar solicitação.',
    })
  } finally {
    yield put(SetRedeemPointsLoading(false))
  }
}

export default all([
  takeLatest(Types.GET_EXTRACT_REQUEST, getExtract),
  takeLatest(Types.GET_BALANCE_REQUEST, getBalance),
  takeLatest(Types.POST_REDEEM_POINTS_REQUEST, postRescuePoints),
])
