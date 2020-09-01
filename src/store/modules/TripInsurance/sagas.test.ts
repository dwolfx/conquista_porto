import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import {
  GetTripInsuranceDataSuccess,
  GetTripInsuranceDataFailure,
} from './action'

describe('Trip Insurance Sagas', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = { data: [] }

    expect(generator.next().value).toEqual(
      call(get, `/produtos/vida?codigoCanal=1&tipoSeguro=VIAGEM`)
    )

    expect(generator.next(response).value).toEqual(
      put(GetTripInsuranceDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers success action, IF condition', () => {
    const generator = getData()
    const response = {
      data: {
        ProdutosViagem: {
          Viagem: [
            {
              codigoFormaPagamento: '62',
            },
          ],
        },
      },
    }

    expect(generator.next().value).toEqual(
      call(get, `/produtos/vida?codigoCanal=1&tipoSeguro=VIAGEM`)
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetTripInsuranceDataSuccess(
          [response.data.ProdutosViagem.Viagem].flatMap(product => product)
        )
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers success action, IF condition and catch value', () => {
    const generator = getData()
    const response = { data: { Mensagem: 'mensagem' } }

    expect(generator.next().value).toEqual(
      call(get, `/produtos/vida?codigoCanal=1&tipoSeguro=VIAGEM`)
    )

    expect(generator.next(response).value).toEqual(
      put(GetTripInsuranceDataSuccess([]))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `/produtos/vida?codigoCanal=1&tipoSeguro=VIAGEM`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetTripInsuranceDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
