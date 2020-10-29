import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getExpirationDays } from './sagas'
import {
  GetCreditCardExpirationDaysFailure,
  GetCreditCardExpirationDaysSuccess
} from './action'

describe('ExpirationDays sagas tests', () => {
  it('should exists', () => {
    expect(getExpirationDays).toBeDefined()
  })
  it('success triggers success action', () => {
    const generator = getExpirationDays()
    const response = { 
      data: {
        codRetorno: '0',
        bandeiras: [
          {
            codBandeira: '1',
            bandeira: 'VISA',
            descricao: '1'
          },
          {
            codBandeira: '1',
            bandeira: 'VISA',
            descricao: '3'
          },
          {
            codBandeira: '2',
            bandeira: 'MASTER',
            descricao: '1'
          },
          {
            codBandeira: '2',
            bandeira: 'MASTER',
            descricao: '3'
          },
        ],
        msgRetorno: 'Consulta realizada com sucesso.',
        visa: [
          {
            codBandeira: '1',
            bandeira: 'VISA',
            descricao: '1'
          },
          {
            codBandeira: '1',
            bandeira: 'VISA',
            descricao: '3'
          },
        ],
        mastercard: [
          {
            codBandeira: '2',
            bandeira: 'MASTER',
            descricao: '1'
          },
          {
            codBandeira: '2',
            bandeira: 'MASTER',
            descricao: '3'
          },
        ]
      },
      isLoading: false,
      hasError: false
    }

    expect(generator.next().value).toEqual(call(get, '/cartoes/dia/vencimento?codigo_canal=14'))

    expect(generator.next(response).value).toEqual(
      put(GetCreditCardExpirationDaysSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers error action', () => {
    const generator = getExpirationDays()
    const response = undefined
    generator.next()
    expect(generator.throw(response).value).toEqual(put(GetCreditCardExpirationDaysFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
 
})
