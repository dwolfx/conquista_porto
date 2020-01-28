import { Types } from './types'

export function AuthRequestLoginSuccess(payload) {
  return {
    type: Types.AUTH_REQUEST_LOGIN_SUCCESS,
    payload,
  }
}

export function AuthRequestLoginFailure() {
  return {
    type: Types.AUTH_REQUEST_LOGIN_FAILURE,
  }
}

export function AuthRequestLogin(credentials) {
  return {
    type: Types.AUTH_REQUEST_LOGIN,
    credentials,
  }
}

export function AuthRequestLogout(accessToken) {
  return {
    type: Types.AUTH_REQUEST_LOGOUT,
    accessToken,
  }
}
