import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import PrivateWelfareResponse from 'mocks/privateWelfare.json'
import privateWelfateWithStatusPREResponse from 'mocks/privateWelfateWithStatusPRE.json'
import BadRequestException from 'services/exceptions/BadRequestException'
import { IPrivateWelfare } from './types'
import {
  GetPrivateWelfareFailure,
  GetPrivateWelfareSuccess,
  GetPrivateWelfareEmpty,
  GetPrivateWelfareWithStatusPRESuccess,
  GetPrivateWelfareWithStatusPREFailure,
} from './action'

import { getPrivateWelfareData, getPrivateWelfareWithStatusPRE } from './sagas'

describe('PrivateWelfare sagas test', () => {
  describe('getPrivateWelfareData', () => {
    it('must have generator function', () => {
      const generator = getPrivateWelfareData()
      expect(generator).toBeDefined()
    })
    it('should call api', () => {
      const generator = getPrivateWelfareData()
      expect(generator.next().value).toEqual(call(get, '/adesoes/titular/cpf'))
    })
    it('should get data', () => {
      const generator = getPrivateWelfareData()
      const response = {
        data: PrivateWelfareResponse,
      }
      const newData = [response.data].flatMap(item => item)

      // pega todas as previdências que não possuem status 'CAN' ou 'RCH' ou 'ERR
      // @ts-ignore
      const filteredData: IPrivateWelfare[] = [...newData].filter(
        // @ts-ignore
        (pv: IPrivateWelfare) =>
          pv.status !== 'CAN' && pv.status !== 'RCH' && pv.status !== 'ERR'
      )

      // garante que o retorno do campo 'benefits' será um array
      const filteredDataWithNewBenefitsArray = [...filteredData].map(pv => ({
        ...pv,
        benefits: [pv.benefits].flatMap(item => item),
      }))

      generator.next() // já testado
      expect(generator.next(response).value).toEqual(
        put(GetPrivateWelfareSuccess(filteredDataWithNewBenefitsArray))
      )
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('should triggers failure action when getPrivateWelfareData throws error', () => {
      const generator = getPrivateWelfareData()
      const response = undefined
      generator.next()
      expect(generator.throw(response).value).toEqual(
        put(GetPrivateWelfareFailure())
      )
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('success: should be able to dispatch empty action when data length is 0', () => {
      const generator = getPrivateWelfareData()
      const response = {
        data: [],
      }
      generator.next()
      expect(generator.next(response).value).toEqual(
        put(GetPrivateWelfareEmpty())
      )
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('should be able to dispatch empty action when BadRequest error is throw', () => {
      const generator = getPrivateWelfareData()
      generator.next()
      expect(
        generator.throw(
          new BadRequestException(
            'Nenhuma proposta encontrada para esse cpf informado.'
          )
        ).value
      ).toEqual(put(GetPrivateWelfareEmpty()))
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
  describe('getPrivateWelfareWithStatusPRE', () => {
    it('must have generator function', () => {
      const generator = getPrivateWelfareWithStatusPRE()
      expect(generator).toBeDefined()
    })
    it('should call api', () => {
      const generator = getPrivateWelfareWithStatusPRE()
      expect(generator.next().value).toEqual(
        call(get, '/adesoes/aprovada/titular/cpf')
      )
    })
    it('should get data', () => {
      const generator = getPrivateWelfareWithStatusPRE()
      const response = {
        data: privateWelfateWithStatusPREResponse,
      }

      generator.next() // já testado
      expect(generator.next(response).value).toEqual(
        put(
          GetPrivateWelfareWithStatusPRESuccess(
            privateWelfateWithStatusPREResponse
          )
        )
      )
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('should triggers failure action when getPrivateWelfareWithStatusPRE throws error', () => {
      const generator = getPrivateWelfareWithStatusPRE()
      const response = undefined
      generator.next()
      expect(generator.throw(response).value).toEqual(
        put(GetPrivateWelfareWithStatusPREFailure())
      )
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('success: should do nothing when data is undefined', () => {
      const generator = getPrivateWelfareWithStatusPRE()
      const response = {
        data: undefined,
      }
      generator.next()
      expect(generator.next(response).value).toEqual(undefined)
    })
  })
})
