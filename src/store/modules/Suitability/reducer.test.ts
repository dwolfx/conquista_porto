import reducer from './reducer'
import { Types } from './types'

describe('Suitability reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: {},
      isLoading: true,
    })
  })

  it('should return GET_SUCCESS', () => {
    expect(
      reducer(
        {
          data: {},
          isLoading: false,
        },
        {
          type: Types.GET_SUCCESS,
          payload: {
            link: '',
            errorPath: '',
            history: {},
            goalType: '',
          },
        }
      )
    ).toEqual({
      data: {
        link: '',
        errorPath: '',
        history: {},
        goalType: '',
      },
      isLoading: false,
    })
  })

  it('should return GET_NO_CONTENT', () => {
    expect(
      reducer(
        {
          data: {},
          isLoading: true,
        },
        {
          type: Types.GET_NO_CONTENT,
        }
      )
    ).toEqual({
      data: {},
      isLoading: false,
    })
  })

  it('should handle GET_FAILURE', () => {
    expect(
      reducer(
        {
          data: {},
          isLoading: true,
        },
        {
          type: Types.GET_FAILURE,
        }
      )
    ).toEqual({
      data: {},
      isLoading: false,
    })
  })

  it('should handle SET_LOADING', () => {
    expect(
      reducer(
        {
          data: {},
          isLoading: true,
        },
        {
          type: Types.SET_LOADING,
          isLoading: true,
        }
      )
    ).toEqual({
      data: {},
      isLoading: true,
    })
  })
})
