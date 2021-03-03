import { call, put, select } from 'redux-saga/effects'

import { post, put as putAxios, baseURLNamespaceAuth2 } from 'services/api'

import {
  generateKeyboard,
  validateSignature,
  generateNewSignature,
  postNewSignature,
} from './sagas'
import {
  PostVirtualKeyboardDataSuccess,
  PostVirtualKeyboardDataFailure,
  PutVirtualKeyboardDataSuccess,
  SetNewSignatureLoading,
} from './action'

import { getAuth, getEmailToNewSignature } from './selectors'
import { IGenerateNewSignaturePayload } from './types'

describe('VirtualKeyboard Sagas', () => {
  describe('generateKeyboard', () => {
    it('generateKeyboard: success triggers success action', () => {
      const generator = generateKeyboard()
      const response = { data: '{ "type": "TESTE" }' }
      const parsedResponse = JSON.parse(response.data)

      expect(generator.next().value).toEqual(select(getAuth))

      expect(generator.next(response).value).toEqual(
        call(post, `${baseURLNamespaceAuth2}/teclado-virtual`, {
          usuario: undefined,
          organizacao: 'CLIENTES',
        })
      )

      expect(generator.next(response).value).toEqual(
        put(PostVirtualKeyboardDataSuccess(parsedResponse))
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('generateKeyboard: fail triggers fail action', () => {
      const generator = generateKeyboard()
      const response = { data: '{ "type": "TESTE" }' }

      expect(generator.next().value).toEqual(select(getAuth))

      expect(generator.next(response).value).toEqual(
        call(post, `${baseURLNamespaceAuth2}/teclado-virtual`, {
          usuario: undefined,
          organizacao: 'CLIENTES',
        })
      )

      expect(generator.next().value).toEqual(
        put(PostVirtualKeyboardDataFailure())
      )

      // TODO: Refatorar sagas para remover throw
      // expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('validateSignature', () => {
    it('validateSignature: success triggers success action', () => {
      const param = {
        type: 'teste',
        payload: { signature: '', onError: () => {} },
      }
      const generator = validateSignature(param)

      expect(generator.next().value).toEqual(select(getAuth))

      expect(generator.next().value).toEqual(
        call(putAxios, `${baseURLNamespaceAuth2}/teclado-virtual`, {
          usuario: undefined,
          organizacao: 'CLIENTES',
          resposta: '',
        })
      )

      expect(generator.next().value).toEqual(
        put(PutVirtualKeyboardDataSuccess())
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('generateNewSignature', () => {
    it('generateNewSignature: success triggers success action', () => {
      const generator = generateNewSignature()

      expect(generator.next().value).toEqual(select(getAuth))

      expect(generator.next().value).toEqual(
        call(putAxios, `${baseURLNamespaceAuth2}/assinatura-eletronica`, {
          usuario: undefined,
          organizacao: 'CLIENTES',
        })
      )
    })

    it('postNewSignature: success triggers success action', () => {
      const param: IGenerateNewSignaturePayload = {
        type: 'email_otp',
        // @ts-expect-error
        payload: {
          type: 'email_otp',
          addToast: () => {},
          handleModalNewSignatureCloseOrOpen: () => {},
        },
      }

      const generator = postNewSignature(param)

      expect(generator.next().value).toEqual(select(getAuth))

      expect(generator.next().value).toEqual(select(getEmailToNewSignature))

      expect(generator.next().value).toEqual(
        call(post, `${baseURLNamespaceAuth2}/assinatura-eletronica`, {
          usuario: undefined,
          organizacao: 'CLIENTES',
        })
      )

      expect(generator.next().value).toEqual(put(SetNewSignatureLoading(false)))
    })
  })
})
