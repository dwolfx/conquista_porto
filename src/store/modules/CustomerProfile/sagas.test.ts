import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import { GetDataSuccess, GetDataFailure } from './action'

describe('get customer profile', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = {
      data: {
        cpfCnpj: '36275312807',
        nomeCliente: 'Rubao',
        emailCliente: 'ricardo.eufrasio@portoseguro.com.br',
        estado: 'SP',
        dataNascimento: '1981-11-11T00:00:00-03:00',
      },
    }

    expect(generator.next().value).toEqual(call(get, '/perfil/dados-cliente'))

    expect(generator.next(response).value).toEqual(
      put(GetDataSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(call(get, '/perfil/dados-cliente'))
    expect(generator.next(response).value).toEqual(put(GetDataFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
