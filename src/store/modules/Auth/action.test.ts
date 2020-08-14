import { Types } from './types'
import {
  AuthRequestLoginSuccess,
  AuthRequestLoginFailure,
  AuthRequestLogin,
  AuthRequestLogout,
} from './action'

describe('Auth Actions', () => {
  test('if AuthRequestLoginSuccess returns the correct object', () => {
    const payload = {}
    expect(AuthRequestLoginSuccess(payload)).toEqual({
      type: Types.AUTH_REQUEST_LOGIN_SUCCESS,
      payload,
    })
  })

  test('if AuthRequestLoginFailure returns the correct object', () => {
    const error = {}
    expect(AuthRequestLoginFailure(error)).toEqual({
      type: Types.AUTH_REQUEST_LOGIN_FAILURE,
      error,
    })
  })

  test('if AuthRequestLogin returns the correct object', () => {
    const credentials = {}
    expect(AuthRequestLogin(credentials)).toEqual({
      type: Types.AUTH_REQUEST_LOGIN,
      credentials,
    })
  })

  test('if AuthRequestLogout returns the correct object', () => {
    const accessToken = ''
    expect(AuthRequestLogout(accessToken)).toEqual({
      type: Types.AUTH_REQUEST_LOGOUT,
      accessToken,
    })
  })
})
