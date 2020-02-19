import { getCookieValue } from 'helpers'
import { Types } from './types'

const INITIAL_STATE = () => {
  const accessToken = getCookieValue('accessToken')
  const cpf = getCookieValue('cpf')

  return {
    accessToken,
    cpf,
  }
}

export default function(state = INITIAL_STATE(), action) {
  switch (action.type) {
    case Types.AUTH_REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }

    case Types.AUTH_REQUEST_LOGOUT:
      return {}

    case Types.AUTH_REQUEST_LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
