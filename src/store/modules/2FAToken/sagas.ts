import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { get, post, put as putAxios, baseURLNamespaceAuth2 } from 'services/api'
import { IToast } from 'hooks/toast'

import {
  Post2FATokenDataSuccess,
  Post2FATokenDataFailure,
  Put2FATokenDataSuccess,
  Put2FATokenDataFailure,
  Get2FADataSuccess,
  Get2FADataFailure,
} from './action'
import { Types } from './types'
import { getAuth } from './selectors'

function handleOrganizacao() {
  const env = process.env.REACT_APP_ENV
  let organizacao
  if (env === 'production') {
    organizacao = 'CLIENTES_PROD'
  } else {
    organizacao = 'CLIENTES_HML'
  }

  return organizacao
}

interface IPropsPostData {
  type: string
  payload: {
    type: 'email_otp' | 'sms_otp'
    addToast?: (toast: Omit<IToast, 'id'>) => void
  }
}

function* postData({ payload }: IPropsPostData) {
  const { type, addToast } = payload
  try {
    const auth = yield select(getAuth)
    yield call(post, `${baseURLNamespaceAuth2}/otp`, {
      usuario: auth.cpf,
      organizacao: handleOrganizacao(),
      tipo: type,
    })
    yield put(Post2FATokenDataSuccess())

    if (addToast) {
      addToast({
        type: 'success',
        title:
          type === 'email_otp' ? 'Enviado para o seu e-mail' : 'SMS enviado',
        description: 'Token enviado com sucesso.',
      })
    }
  } catch (err) {
    yield put(Post2FATokenDataFailure())
    if (addToast)
      addToast({
        type: 'error',
        title: 'Falha ao enviar seu token',
        description: 'Tente novamente.',
      })
  }
}

interface IPropsPutPayload {
  type: string
  payload: {
    type: 'email_otp' | 'sms_otp'
  }
}

function* putData({ payload }: IPropsPutPayload) {
  const { type } = payload
  try {
    const auth = yield select(getAuth)
    yield call(putAxios, `${baseURLNamespaceAuth2}/otp`, {
      usuario: auth.cpf,
      organizacao: handleOrganizacao(),
      tipo: type,
      otp_token: '', //precisa identificar se receberemos como props ou se vai ser pela store
    })
    yield put(Put2FATokenDataSuccess())
  } catch (err) {
    yield put(Put2FATokenDataFailure())
  }
}

function* getOptData() {
  try {
    const auth = yield select(getAuth)
    const response = yield call(
      get,
      `${baseURLNamespaceAuth2}/cadastro-dispositivo?cpf=${
        auth.cpf
      }&organizacao=${handleOrganizacao()}`
    )
    yield put(Get2FADataSuccess(response.data))
  } catch (err) {
    yield put(Get2FADataFailure())
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, postData),
  takeLatest(Types.PUT_REQUEST, putData),
  takeLatest(Types.GET_PERSONALDATA_REQUEST, getOptData),
])
