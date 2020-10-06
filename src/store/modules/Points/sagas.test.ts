import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getExtract, getBalance, postRescuePoints } from './sagas'
import {
  GetPointsExtractSuccess,
  GetPointsExtractFailure,
  GetPointsBalanceSuccess,
  GetPointsBalanceFailure,
} from './action'

describe('get extract', () => {
  it('should triggers success action when getExtract is success', () => {
    const generator = getExtract()
    const response = {
      data: {
        Message: '',
        detalheExtratoOptemaisTypes: [],
      },
    }

    expect(generator.next().value).toEqual(
      call(get, '/programa-pontos/extrato')
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetPointsExtractSuccess({
          ...response.data,
          detalheExtratoOptemaisTypes: [
            ...response.data.detalheExtratoOptemaisTypes,
          ],
        })
      )
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('should triggers failure action when getExtract is failure', () => {
    const generator = getExtract()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, '/programa-pontos/extrato')
    )
    expect(generator.next(response).value).toEqual(
      put(GetPointsExtractFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('should triggers success action when getBalance is success', () => {
    const generator = getBalance()
    const response = {
      data: {
        Message: '',
        consultaPontosResponseType: {},
        extratoOptemaisType: {},
      },
    }

    expect(generator.next().value).toEqual(
      call(get, '/programa-pontos/consultar-pontos')
    )

    expect(generator.next(response).value).toEqual(
      put(GetPointsBalanceSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('should triggers failure action when getBalance is failure', () => {
    const generator = getBalance()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, '/programa-pontos/consultar-pontos')
    )
    expect(generator.next(response).value).toEqual(
      put(GetPointsBalanceFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('should throw error when consultaPontosResponseType is false - getBalance', () => {
    const generator = getBalance()
    const response = {
      data: {
        Message: 'test',
        consultaPontosResponseType: false,
      },
    }
    expect(generator.next().value).toEqual(
      call(get, '/programa-pontos/consultar-pontos')
    )
    expect(generator.next(response).value).toEqual(
      put(GetPointsBalanceFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('should throw error when extratoOptemaisType is false - getBalance', () => {
    const generator = getBalance()
    const response = {
      data: {
        Message: 'test',
        consultaPontosResponseType: {},
        extratoOptemaisType: false,
      },
    }
    expect(generator.next().value).toEqual(
      call(get, '/programa-pontos/consultar-pontos')
    )
    expect(generator.next(response).value).toEqual(
      put(GetPointsBalanceFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
