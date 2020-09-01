import reducer from './reducer'
import { Types } from './types'

describe('Trip Insurance Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      status: '',
      data: null,
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle GET_DATA_REQUEST', () => {
    expect(
      reducer(
        {
          status: '',
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_DATA_REQUEST,
        }
      )
    ).toEqual({
      status: '',
      data: null,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle GET_DATA_SUCCESS', () => {
    expect(
      reducer(
        {
          status: '',
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_DATA_SUCCESS,
          payload: ['ok'],
        }
      )
    ).toEqual({
      data: ['ok'],
      hasError: false,
      status: 'loaded',
      isLoading: false,
    })
  })

  it('should handle GET_DATA_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          status: '',
          isLoading: false,
        },
        {
          type: Types.GET_DATA_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      status: '',
      hasError: true,
      isLoading: false,
    })
  })
})
