import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import {
  GetConsolidatedPositionDataSuccess,
  GetConsolidatedPositionDataFailure,
} from './action'

describe('Consolidated Position Sagas', () => {
  it('success triggers success action', () => {
    const generator = getData()

    const response = {
      data: {
        categorias: [{ nome: 'teste ok', valor: 0 }],
        saldototal: 0,
      },
    }

    expect(generator.next().value).toEqual(
      // call(get, `/cotista/posicao/consolidado`)
      call(get, `/cotistas/posicao-consolidada`)
    )

    expect(generator.next(response).value).toEqual(
      put(GetConsolidatedPositionDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      // call(get, `/cotista/posicao/consolidado`)
      call(get, `/cotistas/posicao-consolidada`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetConsolidatedPositionDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
