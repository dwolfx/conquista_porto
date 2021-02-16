import reducer from './reducer'
import { Types } from './types'

describe('Consortium Building States Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle GET_CIVIL_STATUS_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_CIVIL_STATUS_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle GET_CIVIL_STATUS_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_CIVIL_STATUS_SUCCESS,
          payload: ['ok'],
        }
      )
    ).toEqual({
      data: ['ok'],
      hasError: false,
      isLoading: false,
    })
  })

  it('should handle GET_CIVIL_STATUS_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_CIVIL_STATUS_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
    })
  })
})
