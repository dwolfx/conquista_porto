import { takeLatest, call, put } from 'redux-saga/effects'
import { get, post } from 'services/api'

import { getData, postData } from './sagas'
import {
  GetObjectiveDataSuccess,
  GetObjectiveDataFailure,
  PostObjectiveDataSuccess,
  PostObjectiveDataFailure,
} from './action'

describe('Objective Insurance Sagas', () => {
  it('POST: isMobile: success triggers success action', () => {
    const param = { payload: { data: {}, isMobile: true, onSuccess: () => {} } }
    const generator = postData(param)
    const response = { data: {} }

    expect(generator.next().value).toEqual(
      call(post, `/recommendations?mobile=true`, {})
    )

    expect(generator.next(response).value).toEqual(
      put(PostObjectiveDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('POST: isDesktop: success triggers success action', () => {
    const param = {
      payload: { data: {}, isMobile: false, onSuccess: () => {} },
    }
    const generator = postData(param)
    const response = { data: {} }

    expect(generator.next().value).toEqual(call(post, `/recommendations`, {}))

    expect(generator.next(response).value).toEqual(
      put(PostObjectiveDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('POST: failure triggers failure action', () => {
    const param = {
      payload: { data: {}, isMobile: false, onSuccess: () => {} },
    }
    const generator = postData(param)
    const response = undefined

    expect(generator.next().value).toEqual(call(post, `/recommendations`, {}))
    expect(generator.next(response).value).toEqual(
      put({
        ...PostObjectiveDataFailure(),
        toast: {
          message: "Cannot read property 'data' of undefined",
          options: undefined,
          type: 'error',
        },
      })
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('GET: success triggers success action', () => {
    const generator = getData()
    const response = { data: {} }

    expect(generator.next().value).toEqual(call(get, `/goals`))

    expect(generator.next(response).value).toEqual(
      put(GetObjectiveDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('GET: failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(call(get, `/goals`))
    expect(generator.next(response).value).toEqual(
      put(GetObjectiveDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
