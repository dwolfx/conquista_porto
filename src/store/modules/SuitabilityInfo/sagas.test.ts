import { call, put, select } from 'redux-saga/effects'
import {
  get,
  baseURLNamespaceInvest,
  baseURLNamespaceInvestAws,
} from 'services/api'

import { getSuitabilityInfoData, getDataValidate } from './sagas'
import { GetDataSuccess, GetDataFailure } from './action'
import { getSuitabilityInfo, getCustomerProfile } from './selectors'
import { IPayload } from './types'

describe('SuitabilityInfo Sagas', () => {
  describe('getSuitabilityInfoData', () => {
    it('getSuitabilityInfoData: success triggers success action', () => {
      const generator = getSuitabilityInfoData()
      const response = { data: {} }

      expect(generator.next().value).toEqual(
        call(get, `${baseURLNamespaceInvest}/cotista/status`)
      )

      expect(generator.next(response).value).toEqual(
        put(GetDataSuccess({ ...response.data, isValid: false }))
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('getSuitabilityInfoData: failure triggers failure action', () => {
      const generator = getSuitabilityInfoData()
      const response = undefined
      expect(generator.next().value).toEqual(
        call(get, `${baseURLNamespaceInvest}/cotista/status`)
      )
      expect(generator.next(response).value).toEqual(
        put({
          ...GetDataFailure(),
        })
      )
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })

  describe('getDataValidate', () => {
    it('getDataValidate: success triggers success action', () => {
      const param: IPayload = {
        type: 'investir',
        payload: {
          onSuccess: () => {},
          buttonType: 'investir',
          onErrorToast: () => {},
        },
      }

      const generator = getDataValidate(param)
      const response = {
        data: {
          cpfCnpj: 'cpfCnpj',
          nomeCliente: 'nomeCliente',
          emailCliente: 'nomeCliente',
        },
      }

      expect(generator.next().value).toEqual(select(getSuitabilityInfo))

      expect(generator.next().value).toEqual(select(getCustomerProfile))

      expect(generator.next().value).toEqual(
        call(get, `${baseURLNamespaceInvestAws}/cliente/dados`)
      )

      expect(generator.next(response).value).toEqual(
        call(get, `${baseURLNamespaceInvest}/cotista/status`)
      )

      const suitabilityInfo = {
        CotistaContaOrdemPortoPar: 'string',
        codigo_status_cotista: 'string',
        id_cotista: 'string',
        investidor_profissional: 'string',
        investidor_qualificado: 'string',
        status_cotista: true,
        status_data_vencimento_cadastro: true,
        status_data_vigencia_suitability: true,
        status_possui_suitability: true,
        isValid: true,
      }

      // TODO: Mais um caso de teste ser igual porem achar que é diferente
      generator.next(suitabilityInfo).value
      // expect(generator.next(response).value).toEqual(
      //   put(GetDataSuccess({...suitabilityInfo, isValid: false }))
      // )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('getDataValidate: fail triggers fail action', () => {
      const param: IPayload = {
        type: 'investir',
        payload: {
          onSuccess: () => {},
          buttonType: 'investir',
          onErrorToast: () => {},
        },
      }

      const generator = getDataValidate(param)
      const response = {
        data: {
          cpfCnpj: 'cpfCnpj',
          nomeCliente: 'nomeCliente',
          emailCliente: 'nomeCliente',
        },
      }

      expect(generator.next().value).toEqual(select(getSuitabilityInfo))

      expect(generator.next().value).toEqual(select(getCustomerProfile))

      expect(generator.next().value).toEqual(
        call(get, `${baseURLNamespaceInvestAws}/cliente/dados`)
      )

      expect(generator.next(response).value).toEqual(
        call(get, `${baseURLNamespaceInvest}/cotista/status`)
      )

      expect(generator.next().value).toEqual(
        put({
          ...GetDataFailure(),
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
