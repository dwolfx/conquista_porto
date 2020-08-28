import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { getSuitabilityInfoData } from 'store/modules/SuitabilityInfo/sagas'
import { getDataAndRedirect } from './sagas'
import { selectSuitability, selectSuitabilityInfo } from './selectors'
import {
  GetSuitabilityDataFailure,
  GetSuitabilityDataNoContent,
  SetSuitabilityLoading,
} from './action'

describe('get Suitability', () => {
  it('should trigger success redirect', () => {
    const payload = {
      link: '',
      errorPath: '',
      history: {
        push: () => {},
      },
      goalType: '',
    }
    const generator = getDataAndRedirect({ payload })
    const selectorsResponse = {
      data: {
        status_data_vigencia_suitability: true,
        status_possui_suitability: true,
      },
    }

    expect(generator.next().value).toEqual(put(SetSuitabilityLoading(true)))

    expect(generator.next().value).toEqual(select(selectSuitability))

    expect(generator.next(selectorsResponse).value).toEqual(
      select(selectSuitabilityInfo)
    )

    expect(generator.next(selectorsResponse)).toEqual({
      done: true,
      value: undefined,
    })
  })
  it('should trigger GetSuitabilityDataNoContent with goalType', () => {
    const payload = {
      link: '',
      errorPath: '',
      history: {
        push: () => {},
      },
      goalType: '1',
    }
    const generator = getDataAndRedirect({ payload })
    const selectorsResponse = {
      data: {},
    }
    const response = {
      status: 200,
      data: {
        idpessoa: 632,
        idperfilinvest: 3,
        nomeperfilinvest: 'Arrojado',
      },
    }

    delete window.location
    window.location = { ...window.location, href: '/' }

    expect(generator.next().value).toEqual(put(SetSuitabilityLoading(true)))

    expect(generator.next().value).toEqual(select(selectSuitability))

    expect(generator.next(selectorsResponse).value).toEqual(
      select(selectSuitabilityInfo)
    )
    expect(generator.next({ data: false }).value).toEqual(
      call(getSuitabilityInfoData)
    )
    expect(generator.next(selectorsResponse).value).toEqual(
      select(selectSuitabilityInfo)
    )

    expect(generator.next({ response, ...selectorsResponse }).value).toEqual(
      call(get, '/cotista/perfil/investidor')
    )

    expect(generator.next({ response, ...selectorsResponse }).value).toEqual(
      put(GetSuitabilityDataNoContent())
    )

    expect(generator.next(response)).toEqual({ done: true, value: undefined })
  })
  it('should trigger GetSuitabilityDataNoContent without goalType', () => {
    const payload = {
      link: '',
      errorPath: '',
      history: {
        push: () => {},
      },
      goalType: '',
    }
    const generator = getDataAndRedirect({ payload })
    const selectorsResponse = {
      data: {},
    }
    const response = {
      status: 200,
      data: {
        idpessoa: 632,
        idperfilinvest: 3,
        nomeperfilinvest: 'Arrojado',
      },
    }

    delete window.location
    window.location = { ...window.location, href: '/' }

    expect(generator.next().value).toEqual(put(SetSuitabilityLoading(true)))

    expect(generator.next().value).toEqual(select(selectSuitability))

    expect(generator.next(selectorsResponse).value).toEqual(
      select(selectSuitabilityInfo)
    )
    expect(generator.next({ data: false }).value).toEqual(
      call(getSuitabilityInfoData)
    )
    expect(generator.next(selectorsResponse).value).toEqual(
      select(selectSuitabilityInfo)
    )

    expect(generator.next({ response, ...selectorsResponse }).value).toEqual(
      call(get, '/cotista/perfil/investidor')
    )

    expect(generator.next({ response, ...selectorsResponse }).value).toEqual(
      put(GetSuitabilityDataNoContent())
    )

    expect(generator.next(response)).toEqual({ done: true, value: undefined })
  })
  it('should trigger SetSuitabilityLoading and GetSuitabilityDataFailure when failure', () => {
    //Mock JSON.parse toast err.message
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return { msg: `Cannot read property 'status' of undefined` }
    })

    const payload = {
      link: '',
      errorPath: '/',
      history: {
        push: () => {},
      },
      goalType: '',
    }
    const selectorsResponse = {
      data: {
        status_data_vigencia_suitability: true,
        status_possui_suitability: true,
      },
    }

    const generator = getDataAndRedirect({ payload })

    delete window.location
    window.location = { ...window.location, href: '/' }

    expect(generator.next().value).toEqual(put(SetSuitabilityLoading(true)))

    expect(generator.next().value).toEqual(select(selectSuitability))

    expect(generator.next(selectorsResponse).value).toEqual(
      select(selectSuitabilityInfo)
    )

    expect(generator.next({ data: {} }).value).toEqual(
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

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('should trigger SetSuitabilityLoading and GetSuitabilityDataFailure when failure without errorPath', () => {
    const payload = {
      link: '',
      errorPath: '',
      history: {
        push: () => {},
      },
      goalType: '',
    }
    const selectorsResponse = {
      data: {
        status_data_vigencia_suitability: true,
        status_possui_suitability: true,
      },
    }

    const generator = getDataAndRedirect({ payload })

    delete window.location
    window.location = { ...window.location, href: '/' }

    expect(generator.next().value).toEqual(put(SetSuitabilityLoading(true)))

    expect(generator.next().value).toEqual(select(selectSuitability))

    expect(generator.next(selectorsResponse).value).toEqual(
      select(selectSuitabilityInfo)
    )

    expect(generator.next({ data: {} }).value).toEqual(
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

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
