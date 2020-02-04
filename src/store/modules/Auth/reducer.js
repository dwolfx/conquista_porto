import { Types, TOKEN_NAME } from './types'

const INITIAL_STATE = () => {
  const accessToken = localStorage.getItem(TOKEN_NAME)
  const cpf = localStorage.getItem('cpf')

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
