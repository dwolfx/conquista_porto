import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import { GetBankExtractSuccess, GetBankExtractFailure } from './action'

describe('get bank extract', () => {
  it('success triggers success action', () => {
    const payload = {
      tipoFiltro: 30,
      dataInicial: '2020-01-01',
      dataFinal: '2020-01-02',
    }

    const generator = getData({ payload })
    const response = { data: { TipoCritica: 'CRITICA_NEGOCIO' } }
    expect(generator.next().value).toEqual(
      call(
        get,
        `/conta/extrato?tipoFiltro=30&dataInicial=2020-01-01&dataFinal=2020-01-02`
      )
    )

    expect(generator.next(response).value).toEqual(
      put(GetBankExtractSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    //Mock JSON.parse toast err.message
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return { msg: `Cannot read property 'data' of undefined` }
    })

    const payload = {
      tipoFiltro: 30,
      dataInicial: '2020-01-01',
      dataFinal: '2020-01-02',
    }

    const generator = getData({ payload })
    expect(generator.next().value).toEqual(
      call(
        get,
        `/conta/extrato?tipoFiltro=30&dataInicial=2020-01-01&dataFinal=2020-01-02`
      )
    )

    const toast = {
      message: "Cannot read property 'data' of undefined",
      type: 'error',
    }

    expect(generator.next().value).toEqual(
      put({ ...GetBankExtractFailure(), toast })
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
