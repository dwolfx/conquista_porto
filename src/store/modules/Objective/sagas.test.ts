import { call, put } from 'redux-saga/effects'
import { get, post, put as putFromAPI } from 'services/api'

import {
  getData,
  postData,
  putRecommendationsData,
  postRecalculateFunds,
} from './sagas'
import {
  GetObjectiveDataSuccess,
  GetObjectiveDataFailure,
  PostObjectiveDataSuccess,
  PostObjectiveDataFailure,
  UpdateRecommendationSuccess,
  UpdateRecommendationFailure,
  PostRecalculateFundsSuccess,
  PostRecalculateFundsFailure,
} from './action'

describe('Objective Insurance Sagas', () => {
  it('POST: isMobile: success triggers success action', () => {
    const param = {
      payload: {
        data: {},
        isMobile: true,
        onSuccess: () => {},
        onErrorToast: () => {},
      },
    }
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
      payload: {
        data: {},
        isMobile: false,
        onSuccess: () => {},
        onErrorToast: () => {},
      },
    }
    const generator = postData(param)
    const response = { data: {} }

    expect(generator.next().value).toEqual(call(post, `/recommendations`, {}))

    expect(generator.next(response).value).toEqual(
      put(PostObjectiveDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('POST: isDesktop: success triggers success action without onSuccess function', () => {
    const param = {
      payload: {
        data: {},
        isMobile: false,
        onSuccess: null,
        onErrorToast: () => {},
      },
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
    //Mock JSON.parse toast err.message
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return { msg: `Cannot read property 'data' of undefined` }
    })

    const param = {
      payload: {
        data: {},
        isMobile: false,
        onSuccess: () => {},
        onErrorToast: () => {},
      },
    }
    const generator = postData(param)
    const response = undefined

    expect(generator.next().value).toEqual(call(post, `/recommendations`, {}))
    expect(generator.next(response).value).toEqual(
      put(PostObjectiveDataFailure())
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

  it('PUT: putRecommendationsData - success triggers success action', () => {
    const param = {
      payload: { data: {}, onErrorToast: () => {}, onSuccess: () => {} },
    }
    const generator = putRecommendationsData(param)
    const response = { data: {} }

    expect(generator.next().value).toEqual(
      call(putFromAPI, `/recommendations`, {})
    )

    expect(generator.next(response).value).toEqual(
      put(UpdateRecommendationSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('PUT: putRecommendationsData - failure triggers failure action', () => {
    const param = {
      payload: { data: {}, onErrorToast: () => {} },
    }
    const generator = putRecommendationsData(param)
    const response = undefined

    expect(generator.next().value).toEqual(
      call(putFromAPI, `/recommendations`, {})
    )

    expect(generator.next(response).value).toEqual(
      put(UpdateRecommendationFailure())
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('POST: postRecalculateFunds - success triggers success action', () => {
    const param = {
      payload: { data: {}, onErrorToast: () => {}, onSuccess: () => {} },
    }
    const generator = postRecalculateFunds(param)
    const response = { data: {} }

    expect(generator.next().value).toEqual(
      call(post, `/recommendations/recalculate-funds`, {})
    )

    expect(generator.next(response).value).toEqual(
      put(PostRecalculateFundsSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('POST: postRecalculateFunds - failure triggers failure action', () => {
    const param = {
      payload: { data: {}, onErrorToast: () => {}, onSuccess: () => {} },
    }
    const generator = postRecalculateFunds(param)
    const response = undefined

    expect(generator.next().value).toEqual(
      call(post, `/recommendations/recalculate-funds`, {})
    )

    expect(generator.next(response).value).toEqual(
      put(PostRecalculateFundsFailure())
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
