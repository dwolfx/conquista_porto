import reducer from './reducer'
import { Types } from './types'

const defaultState = {
  accessToken: undefined,
  cpf: undefined,
  digitalSign: undefined,
}

describe('Auth Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('should handle AUTH_REQUEST_LOGIN_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.AUTH_REQUEST_LOGIN_SUCCESS,
          payload: {},
        }
      )
    ).toEqual({
      ...defaultState,
    })
  })

  it('should handle AUTH_REQUEST_LOGOUT', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.AUTH_REQUEST_LOGOUT,
        }
      )
    ).toEqual({})
  })

  it('should handle AUTH_REQUEST_LOGIN_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.AUTH_REQUEST_LOGIN_FAILURE,
          error: {},
        }
      )
    ).toEqual({
      ...defaultState,
      error: {},
    })
  })
})
