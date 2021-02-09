import reducer from './reducer'
import { Types } from './types'

describe('Consortium Building Contemplated reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      status: '',
      data: null,
      isLoading: false,
      hasError: false,
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
        },
        {
          type: Types.GET_SUCCESS,
          payload: { data: { ok: 'ok' } },
        }
      )
    ).toEqual({
      data: { ok: 'ok' },
      hasError: false,
      status: 'loaded',
      isLoading: false,
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
    })
  })
})
