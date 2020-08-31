import { all, takeLatest, call, put, select, fork } from 'redux-saga/effects'

import { get, post, put as putAxios, baseURLNamespaceAuth2 } from 'services/api'
import { SetKeyboardLoading } from '../VirtualKeyboard/action'
import {
  generateKeyboard,
  validateSignature,
} from 'store/modules/VirtualKeyboard/sagas'
import { Types as KeyboardTypes } from 'store/modules/VirtualKeyboard/types'
import RequiredDeviceException from './RequiredDevicesException'
import {
  Post2FATokenDataSuccess,
  Post2FATokenDataFailure,
  Put2FATokenDataSuccess,
  Put2FATokenDataFailure,
  Get2FADataSuccess,
  Get2FADataFailure,
  SetTokenLoading,
} from './action'
import { getAuth, getToken } from './selectors'
import {
  Types,
  IGenerate,
  IPropsPostData,
  IValidateTokenSignature,
  IPropsPutPayload,
} from './types'

function handleOrganizacao() {
  const env = process.env.REACT_APP_ENV
  let organizacao
  if (env === 'production') {
    organizacao = 'CLIENTES'
  } else {
    organizacao = 'CLIENTES_HML'
  }

  return organizacao
}

export function* generateAndSendToken({ payload }: IPropsPostData) {
  const { type, addToast } = payload

  try {
    const auth = yield select(getAuth)
    yield call(post, `${baseURLNamespaceAuth2}/otp`, {
      usuario: auth?.cpf,
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

export function* validateToken({ payload }: IPropsPutPayload) {
  const { type, token } = payload
  try {
    const auth = yield select(getAuth)
    yield call(putAxios, `${baseURLNamespaceAuth2}/otp`, {
      usuario: auth?.cpf,
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

export function* getTokenData() {
  try {
    const auth = yield select(getAuth)
    const response = yield call(
      get,
      `${baseURLNamespaceAuth2}/cadastro-dispositivo?usuario=${
        auth.cpf
      }&organizacao=${handleOrganizacao()}`
    )

    if (
      (response.data &&
        !response.data.find((item: any) => item.name === 'sms_otp')) ||
      !response.data.find((item: any) => item.name === 'email_otp')
    ) {
      throw new RequiredDeviceException()
    }
    yield put(Get2FADataSuccess(response.data))
  } catch (err) {
    yield put(Get2FADataFailure())
    switch (err.constructor) {
      case RequiredDeviceException:
        console.error('Não há dispositivos cadastrado para o 2FA')
        throw err
      default:
        throw new Error(err)
    }
  }
}

export function* run2FAInitialRequest({
  payload: { addToast, onSuccess, onError },
}: IGenerate) {
  yield fork(generateAndSendToken, {
    type: Types.POST_REQUEST,
    payload: { type: 'sms_otp' },
  })
  yield put(
    SetTokenLoading({
      isLoadingGetInfo: true,
    })
  )
  yield put(SetKeyboardLoading(true))

  try {
    yield all([getTokenData(), generateKeyboard()])

    if (onSuccess) {
      onSuccess()
    }
  } catch (err) {
    switch (err.constructor) {
      case RequiredDeviceException:
        if (onError) {
          onError()
        } else {
          addToast({
            description: 'Não há dispositivo cadastrado.',
            title: 'Problema 2FA.',
            type: 'error',
          })
        }
        break
      default:
        addToast({
          description: 'Tente novamenteeeeeeee.',
          title: 'Um erro inesperado ocorreu.',
          type: 'error',
        })
    }
  } finally {
    yield put(
      SetTokenLoading({
        isLoadingGetInfo: false,
      })
    )
    yield put(SetKeyboardLoading(false))
  }
}

export function* validateTokenNSignature({ payload }: IValidateTokenSignature) {
  const { signature, onSuccess, onError, addToast, goToPreviousStep } = payload
  const { type, value: token } = yield select(getToken)

  try {
    yield put(
      SetTokenLoading({
        isLoading: true,
      })
    )
    yield put(SetKeyboardLoading(true))

    yield call(validateToken, {
      type: Types.VALIDATE_REQUEST,
      payload: { type, token },
    })

    yield call(validateSignature, {
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

    goToPreviousStep()
  } finally {
    yield put(
      SetTokenLoading({
        isLoading: false,
      })
    )
    yield put(SetKeyboardLoading(false))
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, generateAndSendToken),
  takeLatest(Types.VALIDATE_REQUEST, validateToken),
  takeLatest(Types.GET_PERSONALDATA_REQUEST, getTokenData),
  takeLatest(Types.RUN_INITIAL_REQUEST, run2FAInitialRequest),
  takeLatest(Types.VALIDATE_TOKEN_SIGNATURE, validateTokenNSignature),
])
