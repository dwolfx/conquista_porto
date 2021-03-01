import reducer from './reducer'
import { Types } from './types'

describe('Consortium Building Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      status: '',
      data: null,
      isLoading: false,
      hasError: false,
      closeLayer: false,
    })
  })

  it('should handle GET_REQUEST', () => {
    expect(
      reducer(
        {
          status: '',
          data: null,
          isLoading: false,
          hasError: false,
          closeLayer: false,
        },
        {
          type: Types.GET_REQUEST,
        }
      )
    ).toEqual({
      status: '',
      data: null,
      isLoading: true,
      hasError: false,
      closeLayer: false,
    })
  })

  it('should handle GET_SUCCESS', () => {
    expect(
      reducer(
        {
          status: '',
          data: null,
          isLoading: false,
          hasError: false,
          closeLayer: false,
        },
        {
          type: Types.GET_SUCCESS,
          payload: ['ok'],
        }
      )
    ).toEqual({
      data: ['ok'],
      hasError: false,
      status: 'loaded',
      isLoading: false,
      closeLayer: false,
    })
  })

  it('should handle GET_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          status: '',
          isLoading: false,
          closeLayer: false,
        },
        {
          type: Types.GET_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      status: '',
      hasError: true,
      isLoading: false,
      closeLayer: false,
    })
  })

  it('should handle GET_CLOSE_LAYER', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          status: '',
          isLoading: false,
          closeLayer: false,
        },
        {
          type: Types.GET_CLOSE_LAYER,
          close: true,
        }
      )
    ).toEqual({
      data: null,
      status: '',
      hasError: false,
      isLoading: false,
      closeLayer: true,
    })
  })
})
