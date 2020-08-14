import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import { GetPositionDataSuccess, GetPositionDataFailure } from './action'

describe('get customer profile', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = {
      data: {},
    }

    const firstSelect = generator.next().value

    expect(firstSelect && firstSelect.type).toEqual(
      select(state => state.consolidatedPosition).type
    )

    const consolidatedPositionState = { data: { saldototal: 10 } }

    expect(generator.next(consolidatedPositionState).value).toEqual(
      call(get, '/cotistas/posicao?codigoCanal=0')
    )

    expect(generator.next(response).value).toEqual(
      put(GetPositionDataSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers success action without store data', () => {
    const generator = getData()
    const response = {
      data: { saldototal: 10, TipoCritica: 'CRITICA_NEGOCIO' },
    }

    const firstSelect = generator.next().value

    expect(firstSelect && firstSelect.type).toEqual(
      select(state => state.consolidatedPosition).type
    )

    const consolidatedPositionState = {}

    expect(generator.next(consolidatedPositionState).value).toEqual(
      call(get, '/cotistas/posicao-consolidada')
    )

    expect(generator.next(response).value).toEqual(
      call(get, '/cotistas/posicao?codigoCanal=0')
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

    const firstSelect = generator.next().value

    expect(firstSelect && firstSelect.type).toEqual(
      select(state => state.consolidatedPosition).type
    )

    expect(generator.next(response).value).toEqual(
      put(GetPositionDataSuccess([]))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined

    const firstSelect = generator.next().value

    expect(firstSelect && firstSelect.type).toEqual(
      select(state => state.consolidatedPosition).type
    )

    expect(generator.next(response).value).toEqual(
      put(GetPositionDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
