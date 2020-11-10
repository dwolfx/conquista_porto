import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { getWithdrawDetails, getWithdrawSummary } from './sagas'
import {
  GetWithdrawSummarySuccess,
  GetWithdrawSummaryFailure,
  GetWithdrawDetailsSuccess,
  GetWithdrawDetailsFailure,
} from './action'
import { getDataValidate } from 'store/modules/SuitabilityInfo/sagas'

import { getAuth, getSuitabilityInfo } from './selectors'
import { Types as SuitabilityTypes } from 'store/modules/SuitabilityInfo/types'

describe('Withdraw Sagas', () => {
  describe('getWithdrawDetails', () => {
    it('getWithdrawDetails: PARTIAL success triggers success action', () => {
      const param = {
        payload: {
          onSuccess: () => null,
          onError: () => null,
          addToast: () => {},
        },
      }
      const generator = getWithdrawDetails(param)

      const getAuthResponse = { cpf: '11111111111', data: {} }
      const getSuitabilityInfoResponse = {
        id_cotista: 1,
        cpf: '11111111111',
        data: {},
      }

      expect(generator.next(getAuthResponse).value).toEqual(select(getAuth))

      expect(JSON.stringify(generator.next(getAuthResponse).value)).toEqual(
        JSON.stringify(
          call(getDataValidate, {
            type: SuitabilityTypes.SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE,
            payload: {
              onSuccess: () => null,
              buttonType: 'retirar',
              onErrorToast: param.payload.addToast,
            },
          })
        )
      )

      expect(generator.next(getSuitabilityInfoResponse).value).toEqual(
        select(getSuitabilityInfo)
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('getWithdrawDetails: fail triggers fail action', () => {
      const param = {
        payload: {
          onSuccess: () => null,
          onError: () => null,
          addToast: undefined,
        },
      }
      const generator = getWithdrawDetails(param)
      const response = undefined

      expect(generator.next().value).toEqual(select(getAuth))

      expect(generator.next(response).value).toEqual(
        put(GetWithdrawDetailsFailure())
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('getWithdrawSummary', () => {
    it('getWithdrawSummary: success triggers success action', () => {
      const param = {
        type: 'getWithdrawSummary',
        payload: {
          onSuccess: () => null,
          onError: () => null,
          data: { valor_operacao: 1 },
        },
      }
      const generator = getWithdrawSummary(param)
      const response = { data: { valor_operacao: 1 } }

      expect(generator.next().value).toEqual(select(getAuth))

      expect(generator.next().value).toEqual(select(getSuitabilityInfo))

      expect(generator.next().value).toEqual(
        call(
          get,
          `/cotista/retiradas/resumo?cpf_cnpj=undefined&id_cotista=undefined&valor_operacao=1`
        )
      )

      expect(generator.next(response).value).toEqual(
        put(GetWithdrawSummarySuccess(response.data))
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('getWithdrawSummary: fail triggers fail action', () => {
      const param = {
        type: 'getWithdrawSummary',
        payload: {
          onSuccess: () => {
            throw Error('teste')
          },
          onError: () => null,
          data: undefined,
        },
      }
      const generator = getWithdrawSummary(param)
      const response = undefined

      expect(generator.next().value).toEqual(select(getAuth))

      expect(generator.next().value).toEqual(select(getSuitabilityInfo))

      expect(generator.next(response).value).toEqual(
        put(GetWithdrawSummaryFailure())
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
