import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  status: '',
  hasError: false,
  isLoading: true,
}

interface IAction {
  type: keyof typeof Types
  payload: {
    cpfCnpj: string
    nomeCliente: string
    emailCliente: string
    estado: string
    dataNascimento: string
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
        data: {
          cpfCnpj: action.payload.cpfCnpj,
          customerName: action.payload.nomeCliente,
          customerEmail: action.payload.emailCliente,
          customerState: action.payload.estado,
          customerBirthdate: action.payload.dataNascimento,
        },
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
