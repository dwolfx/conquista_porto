import reducer from './reducer'

import { Types } from './types'

describe('Bank Extract reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ data: {}, isLayerOpen: false, hasError: false, isLoading: false })
  })
  it('should handle GET_SUCCESS', () => {
    expect(
      reducer(
        {
          data: {},
          isLayerOpen: false,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_SUCCESS,
          payload: { payload: 'success' } }
      )
    ).toEqual({
      data: { payload: 'success' },
      isLayerOpen: false,
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle GET_REQUEST', () => {
    expect(
      reducer(
        {
          data: {},
          isLayerOpen: false,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_REQUEST,
          payload: { payload: 'request' }
        }
      )
    ).toEqual({
      data: {},
      isLayerOpen: false,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle GET_FAILURE', () => {
    expect(
      reducer(
        {
          data: {},
          isLayerOpen: false,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_FAILURE,
          payload: { payload: 'fail' }
        }
      )
    ).toEqual({
      data: null,
      isLayerOpen: false,
      isLoading: false,
      hasError: true,
    })
  })

  it('should handle CLEAR_DATA', () => {
    expect(reducer({ data: {}, isLayerOpen: false, isLoading: false, hasError: false }, { type: Types.CLEAR_DATA })).toEqual({
      data: {},
      isLayerOpen: false,
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle OPEN_ACCOUNT_EXTRACT_LAYER', () => {
    expect(reducer(
      { data: {}, isLayerOpen: false, isLoading: false, hasError: false },
      { type: Types.OPEN_ACCOUNT_EXTRACT_LAYER })).toEqual({
        data: {}, isLayerOpen: true, isLoading: false, hasError: false
      })
  })

  it('should handle CLOSE_ACCOUNT_EXTRACT_LAYER', () => {
    expect(reducer(
      { data: {}, isLayerOpen: true, isLoading: false, hasError: false },
      { type: Types.CLOSE_ACCOUNT_EXTRACT_LAYER })).toEqual({
        data: {}, isLayerOpen: false, isLoading: false, hasError: false
      })
  })
})
