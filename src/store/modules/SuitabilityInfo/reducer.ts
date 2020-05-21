import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  status: '',
  hasError: false,
  isLoading: false,
}
interface IAction {
  type: keyof typeof Types
  payload: {
    CotistaContaOrdemPortoPar: string
    codigo_status_cotista: string
    id_cotista?: string
    investidor_profissional: string
    investidor_qualificado: string
    status_cotista: boolean
    status_data_vencimento_cadastro: boolean
    status_data_vigencia_suitability: boolean
    status_possui_suitability: boolean
  }
}

export default function(state = INITIAL_STATE, action: IAction) {
  switch (action.type) {
    case Types.SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE:
    case Types.SUITABILITY_INFO_GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.SUITABILITY_INFO_GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: 'loaded',
        isLoading: false,
      }
    case Types.SUITABILITY_INFO_GET_DATA_FAILURE:
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
