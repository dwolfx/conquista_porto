import { all, takeLatest, call, put, select, fork } from 'redux-saga/effects'

import { post, put as putAxios, baseURLNamespaceAuth2 } from 'services/api'
import {
  PostVirtualKeyboardDataSuccess,
  PostVirtualKeyboardDataFailure,
  PutVirtualKeyboardDataSuccess,
  PutVirtualKeyboardDataFailure,
  SetNewSignatureLoading,
} from './action'
import NotFoundException from 'services/exceptions/NotFoundException'
import BadRequestException from 'services/exceptions/BadRequestException'
import GenerateKeyboardException from './exceptions/GenerateKeyboardException'
import ValidateSignatureBadRequestException from './exceptions/ValidateSignatureBadRequestException'
import ValidateSignatureException from './exceptions/ValidateSignatureException'
import ValidateSignatureNotFoundException from './exceptions/ValidateSignatureNotFoundException'

import { Types, IGenerateNewSignaturePayload } from './types'

import { getAuth, getEmailToNewSignature } from './selectors'

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

    throw new GenerateKeyboardException(err.message)
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
      usuario: auth?.cpf,
      organizacao: handleOrganizacao(),
      resposta: signature,
    })
    yield put(PutVirtualKeyboardDataSuccess())
  } catch (err) {
    const retries = JSON.parse(err.message).retries

    yield put(PutVirtualKeyboardDataFailure())

    if (retries === 0) {
      // counter started over
      yield fork(generateNewSignature)

      onError()
    }

    switch (err.constructor) {
      case NotFoundException:
        throw new ValidateSignatureNotFoundException(err.message)
      case BadRequestException:
        throw new ValidateSignatureBadRequestException(err.message)
      default:
        throw new ValidateSignatureException(err.message)
    }
  }
}

export function* generateNewSignature() {
  try {
    const auth = yield select(getAuth)

    yield call(putAxios, `${baseURLNamespaceAuth2}/assinatura-eletronica`, {
      usuario: auth?.cpf,
      organizacao: handleOrganizacao(),
    })
  } catch (err) {}
}

export function* postNewSignature({ payload }: IGenerateNewSignaturePayload) {
  const { addToast, handleModalNewSignatureCloseOrOpen } = payload

  try {
    const auth = yield select(getAuth)
    const emailToNewSignature = yield select(getEmailToNewSignature)

    yield call(post, `${baseURLNamespaceAuth2}/assinatura-eletronica`, {
      usuario: auth?.cpf,
      organizacao: handleOrganizacao(),
    })

    yield put(SetNewSignatureLoading(false))

    if (addToast) {
      addToast({
        type: 'success',
        title: `Enviado para: ${emailToNewSignature}`,
        description: 'Nova assinatura enviada com sucesso',
      })
    }
  } catch (err) {
    yield put(SetNewSignatureLoading(false))

    if (addToast) {
      addToast({
        type: 'error',
        title: 'Erro ao enviar nova assinatura',
        description: 'Por favor, tente novamente.',
      })
    }
  } finally {
    handleModalNewSignatureCloseOrOpen(false)
  }
}

export default all([
  takeLatest(Types.POST_REQUEST, generateKeyboard),
  takeLatest(Types.VALIDATE_REQUEST, validateSignature),
  takeLatest(Types.POST_NEW_SIGNATURE, postNewSignature),
])
