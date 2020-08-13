import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import { GetRewardTypesSuccess, GetRewardTypesFailure } from './action'

describe('get Rewards - types', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = {
      data: [
        {
          id: 1,
          name: 'CADASTRO',
          quantity: 500,
        },
        {
          id: 4,
          name: 'PRIMEIRO OBJETIVO',
          quantity: 100,
        },
      ],
    }

    expect(generator.next().value).toEqual(call(get, '/types'))

    expect(generator.next(response).value).toEqual(
      put(GetRewardTypesSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(call(get, '/types'))
    expect(generator.next(response).value).toEqual(put(GetRewardTypesFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
