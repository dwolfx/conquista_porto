import reducer from './reducer'
import { Types } from './types'

const defaultState = {
  data: [],
  isLoading: false,
  hasError: false,
  isLayerOpen: false
}

describe('BankExtractFund Reducer', () => {
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
      data: [],
      hasError: false,
      isLoading: true,
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
          payload: [],
        }
      )
    ).toEqual({
      ...defaultState,
      data: [],
      isLoading: false,
      hasError: false,
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
      hasError: true,
      isLoading: false,
    })
  })

  it('should handle CLEAR_DATA', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.CLEAR_DATA,
        }
      )
    ).toEqual({
      ...defaultState,
      data: {},
    })
  })
})
