import { all, takeLatest, call, put, select, fork } from 'redux-saga/effects'

import { post, put as putAxios, baseURLNamespaceAuth2 } from 'services/api'
import {
  PostVirtualKeyboardDataSuccess,
  PostVirtualKeyboardDataFailure,
  PutVirtualKeyboardDataSuccess,
  PutVirtualKeyboardDataFailure,
} from './action'

import { Types } from './types'
import { getAuth } from './selectors'

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

export function* generateKeyboard() {
  try {
    // este comentário marca o início da escrita de um código cheio de tristeza...
    /**
     * eu tenho praticamente certeza de que não deveria ser necessário enviar esses
     * atributos no payload... mas como não opinamos nisso, segue a vida né?
     */
    const auth = yield select(getAuth)
    const response = yield call(
      post,
      `${baseURLNamespaceAuth2}/teclado-virtual`,
      {
        usuario: auth.cpf,
        organizacao: handleOrganizacao(),
      }
    )
    const regex = /]]/gi
    const parsedResponse = JSON.parse(response.data.replace(regex, ']'))
    /**
     Sim... o response do nosso querido serviço que gera o teclado virtual nos retorna uma chave extra no array.
     Se me perguntarem o por que disso, eu jamais conseguirei explicar.
     Acontece que a vida (ou melhor, essa API maravilhosa) nos dá pedra, e pede como resultado
     um foguete que vai até o Sol buscar água.

    ...fim da história
     */
    yield put(PostVirtualKeyboardDataSuccess(parsedResponse))
  } catch (err) {
    yield put(PostVirtualKeyboardDataFailure())

    throw new Error()
  }
}

interface IPayload {
  type: string
  payload: {
    signature: string
    onError: () => void
  }
}

export function* validateSignature({
  payload: { signature, onError },
}: IPayload) {
  try {
    const auth = yield select(getAuth)
    yield call(putAxios, `${baseURLNamespaceAuth2}/teclado-virtual`, {
      usuario: auth.cpf,
      organizacao: handleOrganizacao(),
      resposta: signature,
    })
    yield put(PutVirtualKeyboardDataSuccess())
  } catch (err) {
    const { retries } = JSON.parse(err.message)

    yield put(PutVirtualKeyboardDataFailure())

    if (retries === 0) {
      // counter started over
      yield fork(generateNewSignature)

      onError()
    }

    throw new Error()
  }
}

function* generateNewSignature() {
  try {
    const auth = yield select(getAuth)

    yield call(putAxios, `${baseURLNamespaceAuth2}/assinatura-eletronica`, {
      usuario: auth.cpf,
      organizacao: handleOrganizacao(),
    })
  } catch (err) {}
}

export default all([
  takeLatest(Types.POST_REQUEST, generateKeyboard),
  takeLatest(Types.VALIDATE_REQUEST, validateSignature),
])
