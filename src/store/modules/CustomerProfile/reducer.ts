import { Types } from './types'

const INITIAL_STATE = {
  cpfCnpj: '36275312807',
  nomeCliente: 'Rubao',
  emailCliente: 'ricardo.eufrasio@portoseguro.com.br',
}

interface IAction {
  type: keyof typeof Types
  payload: {
    cpfCnpj: string
    nomeCliente: string
    emailCliente: string
  }
}

export default function(state = INITIAL_STATE, action: IAction) {
  switch (action.type) {
    case Types.CUSTOMER_PROFILE_GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.CUSTOMER_PROFILE_GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: 'loaded',
        isLoading: false,
      }
    case Types.CUSTOMER_PROFILE_GET_DATA_FAILURE:
      return {
        ...state,
        data: null,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
