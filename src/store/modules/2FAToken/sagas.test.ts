import { all, takeLatest, call, put, select, fork } from 'redux-saga/effects'
import { get, post, put as putAxios, baseURLNamespaceAuth2 } from 'services/api'
import {
  generateKeyboard,
  validateSignature,
} from 'store/modules/VirtualKeyboard/sagas'
import { Types as KeyboardTypes } from 'store/modules/VirtualKeyboard/types'

import {
  generateAndSendToken,
  validateToken,
  getTokenData,
  run2FAInitialRequest,
  validateTokenNSignature,
} from './sagas'

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
import { SetKeyboardLoading } from '../VirtualKeyboard/action'

describe('2FAToken Sagas', () => {
  describe('generateAndSendToken', () => {
    it('generateAndSendToken: success triggers success action', () => {
      const param: IPropsPostData = {
        type: 'email_otp',
        payload: {
          type: 'email_otp',
          addToast: () => {},
        },
      }
      const generator = generateAndSendToken(param)
      const response = { data: {} }

      const getAuthResponse = { cpf: '11111111111' }

      expect(generator.next(getAuthResponse).value).toEqual(select(getAuth))

      expect(generator.next({}).value).toEqual(
        call(post, `${baseURLNamespaceAuth2}/otp`, {
          usuario: undefined,
          organizacao: 'CLIENTES',
          tipo: param.type,
        })
      )

      expect(generator.next(response).value).toEqual(
        put(Post2FATokenDataSuccess())
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('validateToken', () => {
    it('validateToken: success triggers success action', () => {
      const param: IPropsPutPayload = {
        type: 'email_otp',
        payload: {
          type: 'email_otp',
          token: 'token',
        },
      }
      const generator = validateToken(param)
      const response = { data: {} }

      const getAuthResponse = { cpf: '11111111111' }

      expect(generator.next(getAuthResponse).value).toEqual(select(getAuth))

      expect(generator.next({}).value).toEqual(
        call(putAxios, `${baseURLNamespaceAuth2}/otp`, {
          usuario: undefined,
          organizacao: 'CLIENTES',
          tipo: param.type,
          otp_token: param.payload.token,
        })
      )

      expect(generator.next(response).value).toEqual(
        put(Put2FATokenDataSuccess())
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('getTokenData', () => {
    it('getTokenData: success triggers success action', () => {
      const generator = getTokenData()
      const response = {
        data: [
          {
            value: '11998877665',
            name: 'sms_otp',
          },
          {
            value: 'ph@sciensa.com.br',
            name: 'email_otp',
          },
        ],
      }

      const getAuthResponse = { cpf: '11111111111' }

      expect(generator.next(getAuthResponse).value).toEqual(select(getAuth))

      expect(generator.next(response).value).toEqual(
        call(
          get,
          `${baseURLNamespaceAuth2}/cadastro-dispositivo?usuario=undefined&organizacao=CLIENTES`
        )
      )

      expect(generator.next(response).value).toEqual(
        put(Get2FADataSuccess(response.data))
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('run2FAInitialRequest', () => {
    it('run2FAInitialRequest: success triggers success action', () => {
      const param: IGenerate = {
        payload: {
          addToast: () => {},
          onSuccess: () => {},
        },
        type: 'email_otp',
      }
      const generator = run2FAInitialRequest(param)

      expect(generator.next().value).toEqual(
        fork(generateAndSendToken, {
          type: Types.POST_REQUEST,
          payload: { type: 'sms_otp' },
        })
      )

      expect(generator.next({}).value).toEqual(
        put(
          SetTokenLoading({
            isLoadingGetInfo: true,
          })
        )
      )

      expect(generator.next({}).value).toEqual(put(SetKeyboardLoading(true)))

      // TODO: Ver como fazer mock dessas metodos
      // expect(generator.next({}).value).toEqual(
      //   all([getTokenData(), generateKeyboard()])
      // )

      // expect(generator.next(response).value).toEqual(
      //   put(Get2FADataSuccess(response.data))
      // )

      // expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  // describe('validateTokenNSignature', () => {
  //   it('validateTokenNSignature: success triggers success action', () => {
  //     const param: IValidateTokenSignature = {
  //       payload: {
  //         signature: 'string',
  //         onSuccess: () => {},
  //         onError: () => {},
  //         addToast: () => {},
  //         goToPreviousStep: () => {},
  //       },
  //       type: 'email_otp',
  //     }
  //     const generator = validateTokenNSignature(param)

  //     // TODO: Ver como fazer mock dessas metodos
  //     expect(generator.next().value).toEqual(select(getToken))

  //     expect(generator.next().value).toEqual(
  //       put(
  //         SetTokenLoading({
  //           isLoading: true,
  //         })
  //       )
  //     )

  //     expect(generator.next().value).toEqual(put(SetKeyboardLoading(true)))

  //     expect(generator.next().value).toEqual(
  //       call(validateToken, {
  //         type: Types.VALIDATE_REQUEST,
  //         payload: { type: undefined, token: undefined },
  //       })
  //     )

  //     expect(generator.next()).toEqual({ done: true, value: undefined })
  //   })
  // })
})
