import { call } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import { ZipCodeType } from './types'

describe('ZipCode Sagas', () => {
  it('success triggers success action', () => {
    const generator = getData({
      payload: '72876-555',
      type: ZipCodeType.GET_DATA_REQUEST,
    })

    expect(generator.next().value).toEqual(
      call(get, `/cliente/endereco`, {
        params: { cep: '72876', cepSufixo: '555' },
      })
    )

    expect(generator.next()).toEqual({
      done: false,
      value: {
        channel: undefined,
        '@@redux-saga/IO': true,
        combinator: false,
        type: 'PUT',
        payload: {
          action: { type: ZipCodeType.GET_DATA_FAILURE },
          channel: undefined,
        },
      },
    })
  })
})
