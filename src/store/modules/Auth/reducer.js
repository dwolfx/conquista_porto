import { Types } from './types'

const INITIAL_STATE = () => {
  // const accessToken = localStorage.getItem('accessToken')
  // const cpf = localStorage.getItem('cpf')
  const accessToken = '0c77bfe1-5384-4f05-99fa-5068ece0850f'
  const cpf = '22890390802'

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
