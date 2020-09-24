import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import { GetPositionDataSuccess, GetPositionDataFailure } from './action'

describe('get customer profile', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = {
      data: {
        distribuicoes: [],
      },
    }
    expect(generator.next().value).toEqual(call(get, '/cotista/posicao'))

    expect(generator.next(response).value).toEqual(
      put(GetPositionDataSuccess(response.data.distribuicoes))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers success action without store data', () => {
    const generator = getData()
    const response = {
      data: { saldototal: 10, TipoCritica: 'CRITICA_NEGOCIO' },
    }

    expect(generator.next(response).value).toEqual(
      call(get, '/cotista/posicao')
    )

    expect(generator.next(response).value).toEqual(
      put(GetPositionDataSuccess([]))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers success action with saldototal 0', () => {
    const generator = getData()
    const response = {
      data: { saldototal: 0 },
    }
    expect(generator.next(response).value).toEqual(
      call(get, '/cotista/posicao')
    )
    expect(generator.next(response).value).toEqual(
      put(GetPositionDataSuccess([]))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next(response).value).toEqual(
      call(get, '/cotista/posicao')
    )
    expect(generator.next(response).value).toEqual(
      put(GetPositionDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
