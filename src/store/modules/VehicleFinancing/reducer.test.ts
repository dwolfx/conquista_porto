import reducer from './reducer'
import { Types } from './types'

describe('Vehicle Financing reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
    })
  })

  it('should handle GET_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: true,
    })
  })

  it('should handle GET_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_SUCCESS,
          payload: [{ name: 'Aqui tem coragi' }],
        }
      )
    ).toEqual({
      data: [{ name: 'Aqui tem coragi' }],
      hasError: false,
      isLoading: false,
    })
  })

  it('should handle GET_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
    })
  })
})
