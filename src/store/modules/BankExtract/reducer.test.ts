import reducer from './reducer'

import { Types } from './types'

describe('Bank Extract reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ data: {} })
  })
  it('should handle GET_SUCCESS', () => {
    expect(
      reducer(
        { data: {} },
        { type: Types.GET_SUCCESS, payload: { payload: 'success' } }
      )
    ).toEqual({
      data: { payload: 'success' },
    })
  })

  it('should handle CLEAR_DATA', () => {
    expect(reducer({ data: {} }, { type: Types.CLEAR_DATA })).toEqual({
      data: {},
    })
  })
})
