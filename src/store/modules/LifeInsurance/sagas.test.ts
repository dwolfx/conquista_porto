import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import {
  GetLifeInsuranceDataSuccess,
  GetLifeInsuranceDataFailure,
} from './action'

describe('Life Insurance Sagas', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = { data: [] }

    expect(generator.next().value).toEqual(
      call(get, `/produtos/vida?codigoCanal=1&tipoSeguro=VIDA`)
    )

    expect(generator.next(response).value).toEqual(
      put(GetLifeInsuranceDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `/produtos/vida?codigoCanal=1&tipoSeguro=VIDA`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetLifeInsuranceDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
