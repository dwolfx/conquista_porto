import reducer from './reducer'

import { Types } from './types'

describe('Bank Extract reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ data: {}, isLayerOpen: false })
  })
  it('should handle GET_SUCCESS', () => {
    expect(
      reducer(
        {
          data: {},
          isLayerOpen: false
        },
        {
          type: Types.GET_SUCCESS,
          payload: { payload: 'success' } }
      )
    ).toEqual({
      data: { payload: 'success' },
      isLayerOpen: false
    })
  })

  it('should handle CLEAR_DATA', () => {
    expect(reducer({ data: {}, isLayerOpen: false }, { type: Types.CLEAR_DATA })).toEqual({
      data: {},
      isLayerOpen: false,
    })
  })

  it('should handle OPEN_ACCOUNT_EXTRACT_LAYER', () => {
    expect(reducer({ data: {}, isLayerOpen: false }, { type: Types.OPEN_ACCOUNT_EXTRACT_LAYER })).toEqual({
      data: {}, isLayerOpen: true
    })
  })

  it('should handle CLOSE_ACCOUNT_EXTRACT_LAYER', () => {
    expect(reducer({ data: {}, isLayerOpen: true }, { type: Types.CLOSE_ACCOUNT_EXTRACT_LAYER })).toEqual({
      data: {}, isLayerOpen: false
    })
  })
})
