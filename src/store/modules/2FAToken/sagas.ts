import { all, takeLatest, call, put, select, fork } from 'redux-saga/effects'

import { IToast } from 'hooks/toast'
import { get, post, put as putAxios, baseURLNamespaceAuth2 } from 'services/api'
import {
  generateKeyboard,
  validateSignature,
} from 'store/modules/VirtualKeyboard/sagas'
import { Types as KeyboardTypes } from 'store/modules/VirtualKeyboard/types'

import {
  Post2FATokenDataSuccess,
  Post2FATokenDataFailure,
  Put2FATokenDataSuccess,
  Put2FATokenDataFailure,
  Get2FADataSuccess,
  Get2FADataFailure,
} from './action'
import { getAuth, getToken } from './selectors'
import { Types, IGenerate, IPropsPostData } from './types'

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

function* generateAndSendToken({ payload }: IPropsPostData) {
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
    if (addToast) {
      addToast({
        type: 'error',
        title: 'Falha ao enviar seu token',
        description: 'Tente novamente.',
      })
    }
  }
}

interface IPropsPutPayload {
  type: string
  payload: {
    type: 'email_otp' | 'sms_otp'
    token: string
  }
}

function* validateToken({ payload }: IPropsPutPayload) {
  const { type, token } = payload
  try {
    const auth = yield select(getAuth)
    yield call(putAxios, `${baseURLNamespaceAuth2}/otp`, {
      usuario: auth.cpf,
      organizacao: handleOrganizacao(),
      tipo: type,
      otp_token: token, //precisa identificar se receberemos como props ou se vai ser pela store
    })
    yield put(Put2FATokenDataSuccess())
  } catch (err) {
    yield put(Put2FATokenDataFailure())

    throw new Error()
  }
}

function* getTokenData() {
  try {
    const auth = yield select(getAuth)
    const response = yield call(
      get,
      `${baseURLNamespaceAuth2}/cadastro-dispositivo?usuario=${
        auth.cpf
      }&organizacao=${handleOrganizacao()}`
    )
    yield put(Get2FADataSuccess(response.data))
  } catch (err) {
    yield put(Get2FADataFailure())
    throw new Error(err)
  }
}

function* run2FAInitialRequest({
  payload: { addToast, onSuccess },
}: IGenerate) {
  yield fork(generateAndSendToken, {
    type: Types.POST_REQUEST,
    payload: { type: 'sms_otp' },
  })

  try {
    yield all([getTokenData(), generateKeyboard()])

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    addToast({
      description: 'Tente novamente.',
      title: 'Um erro inesperado ocorreu.',
      type: 'error',
    })
  }
}

interface IValidateTokenSignature {
  type: string
  payload: {
    signature: string
    onSuccess: () => void
    onError: () => void
    addToast: (toast: Omit<IToast, 'id'>) => void
  }
}

function* validateTokenNSignature({ payload }: IValidateTokenSignature) {
  const { signature, onSuccess, onError, addToast } = payload
  const { type, value: token } = yield select(getToken)

  try {
    yield* validateToken({
      type: Types.VALIDATE_REQUEST,
      payload: { type, token },
    })

    yield validateSignature({
      type: KeyboardTypes.VALIDATE_REQUEST,
      payload: { signature, onError },
    })

    onSuccess()
  } catch (err) {
    addToast({
      description: 'Tente novamente.',
      title: 'Um erro inesperado ocorreu.',
      type: 'error',
    })
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, generateAndSendToken),
  takeLatest(Types.VALIDATE_REQUEST, validateToken),
  takeLatest(Types.GET_PERSONALDATA_REQUEST, getTokenData),
  takeLatest(Types.RUN_INITIAL_REQUEST, run2FAInitialRequest),
  takeLatest(Types.VALIDATE_TOKEN_SIGNATURE, validateTokenNSignature),
])
