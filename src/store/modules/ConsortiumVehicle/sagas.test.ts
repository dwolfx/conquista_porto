import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import {
  GetConsortiumVehicleDataSuccess,
  GetConsortiumVehicleDataFailure,
} from './action'

describe('Consortium Vehicle Sagas', () => {
  it('success triggers success action 1', () => {
    const generator = getData()
    const response = { data: { Mensagem: 'ok' } }

    expect(generator.next().value).toEqual(
      call(get, `/consorcios/auto?codigoCanal=1`)
    )

    expect(generator.next(response).value).toEqual(
      put(GetConsortiumVehicleDataSuccess([]))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('success triggers success action and IF condition', () => {
    const generator = getData()
    const response = {
      data: {
        consorcios: [
          {
            UrlProposta: '',
            DescricaoBem: 'ONIX HATCH LT 1.4 8V',
            ValorContratado: '52432',
            Descricao: 'Contrato 4000044932',
            ValorParcelaAtual: '838.01',
            StatusConsorcio: 'Não Contemplado',
            QuantidadeParcelasContratadas: '74',
            ValorQuitacao: '46026.8',
            QuantidadeParcelasPagas: '18',
            Marca: '',
            Modelo: '',
            Grupo: 'A241',
            Cota: '124',
            ValorPago: '14777.26',
            PontosGanhos: '100',
          },
        ],
      },
    }

    expect(generator.next().value).toEqual(
      call(get, `/consorcios/auto?codigoCanal=1`)
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetConsortiumVehicleDataSuccess(
          response.data.consorcios.map((consorcio, index) => ({
            ...consorcio,
            Id: index,
          }))
        )
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `/consorcios/auto?codigoCanal=1`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetConsortiumVehicleDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
