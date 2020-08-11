import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { getDataAndRedirect } from './sagas'
import { getSuitability } from './selectors'
import {
  GetSuitabilityDataSuccess,
  GetSuitabilityDataFailure,
  GetSuitabilityDataNoContent,
  SetSuitabilityLoading,
} from './action'

describe('get Suitability', () => {
  it('success triggers success action with 200 status code', () => {
    const payload = {
      link: '',
      errorPath: '',
      history: {},
      goalType: '',
    }
    const generator = getDataAndRedirect({ payload })
    const response = {
      status: 200,
      data: {
        idpessoa: 632,
        idperfilinvest: 3,
        nomeperfilinvest: 'Arrojado',
      },
    }

    expect(generator.next().value).toEqual(put(SetSuitabilityLoading(true)))
    expect(generator.next().value).toEqual(select(getSuitability))
    expect(generator.next().value).toEqual(
      call(get, '/cotista/perfil/investidor')
    )
    expect(generator.next(response).value).toEqual(
      put(GetSuitabilityDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('should trigger GetSuitabilityDataNoContent', () => {
    const payload = {
      link: '',
      errorPath: '/',
      history: {},
      goalType: '',
    }
    const generator = getDataAndRedirect({ payload })
    const response = {
      status: 204,
      data: {
        idpessoa: 632,
        idperfilinvest: 3,
        nomeperfilinvest: 'Arrojado',
      },
    }

    expect(generator.next().value).toEqual(put(SetSuitabilityLoading(true)))
    expect(generator.next().value).toEqual(select(getSuitability))
    expect(generator.next().value).toEqual(
      call(get, '/cotista/perfil/investidor')
    )

    delete window.location
    window.location = { ...window.location, href: '/' }

    expect(generator.next(response).value).toEqual(
      put(GetSuitabilityDataNoContent())
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('should trigger SetSuitabilityLoading and GetSuitabilityDataFailure when failure', () => {
    const payload = {
      link: '',
      errorPath: '/',
      history: {},
      goalType: '',
    }
    const generator = getDataAndRedirect({ payload })

    expect(generator.next().value).toEqual(put(SetSuitabilityLoading(true)))
    expect(generator.next().value).toEqual(select(getSuitability))
    expect(generator.next().value).toEqual(
      call(get, '/cotista/perfil/investidor')
    )

    expect(generator.next().value).toEqual(
      put({
        ...SetSuitabilityLoading(false),
        ...GetSuitabilityDataFailure(),
        toast: {
          message: "Cannot read property 'status' of undefined",
          type: 'error',
        },
      })
    )
  })
})
