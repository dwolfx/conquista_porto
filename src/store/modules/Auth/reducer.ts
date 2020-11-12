import { getCookieValue } from 'helpers'
import { Types, TOKEN_NAME } from './types'

const INITIAL_STATE = () => {
  const accessToken = getCookieValue(TOKEN_NAME)
  const cpf = getCookieValue('cpf')
  const digitalSign = getCookieValue('CLITKNGIW')

  return {
    accessToken,
    digitalSign,
    cpf,
  }
}

export default function(state = INITIAL_STATE(), action: any) {
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
