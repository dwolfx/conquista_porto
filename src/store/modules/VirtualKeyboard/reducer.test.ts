import reducer from './reducer'
import { Types } from './types'

const defaultState = {
  data: null,
  isLoading: false,
  hasError: false,
  isLoadingNewSignature: false,
}

describe('VirtualKeyboard Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('should handle POST_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle POST_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_SUCCESS,
          payload: [],
        }
      )
    ).toEqual({
      ...defaultState,
      data: [],
      isLoading: false,
    })
  })

  it('should handle POST_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoading: false,
      hasError: true,
    })
  })

  it('should handle SET_LOADING', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.SET_LOADING,
          payload: true,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoading: true,
    })
  })

  it('should handle DEFAULT', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: null,
        }
      )
    ).toEqual({
      ...defaultState,
    })
  })

  it('should handle SET_LOADING_NEW_SIGNATURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.SET_LOADING_NEW_SIGNATURE,
          payload: true,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingNewSignature: true,
    })
  })
})
