import reducer from './reducer'
import { Types } from './types'

const defaultState = {
  data: null,
  objectives: null,
  isLoading: false,
  hasError: false,
  isLoadingList: false,
  isLoadingBySimulate: false,
}

describe('Objective Insurance Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('should handle GET_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingList: true,
      hasError: false,
    })
  })

  it('should handle GET_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_SUCCESS,
          payload: ['ok'],
        }
      )
    ).toEqual({
      ...defaultState,
      objectives: ['ok'],
      isLoadingList: false,
    })
  })

  it('should handle GET_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingList: false,
      hasError: true,
    })
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

  it('should handle POST_REQUEST_BY_SIMULATE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_REQUEST_BY_SIMULATE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingBySimulate: true,
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
          payload: { teste: 'ok' },
        }
      )
    ).toEqual({
      ...defaultState,
      data: { teste: 'ok' },
      isLoadingBySimulate: false,
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
      isLoadingBySimulate: false,
      isLoading: false,
      hasError: true,
    })
  })

  it('should handle CLEAN_DATA', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.CLEAN_DATA,
        }
      )
    ).toEqual({
      ...defaultState,
      data: {},
    })
  })
})
