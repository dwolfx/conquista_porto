import { Types, ISuitabilityInfo } from './types'

const INITIAL_STATE = {
  data: null,
  status: '',
  hasError: false,
  isLoading: false,
}
interface IAction {
  type: keyof typeof Types
  payload: ISuitabilityInfo
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
