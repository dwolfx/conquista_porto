import { Types } from './types'

const INITIAL_STATE = {
  data: {},
  isLayerOpen: false,
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        hasError: false,
        isLoading: true,
      }
    case Types.GET_SUCCESS:
      return {
        ...state,
        hasError: false,
        isLoading: false,
        data: { ...action.payload },
      }
    case Types.GET_FAILURE:
      return {
        ...state,
        data: null,
        hasError: true,
        isLoading: false,
      }
    case Types.CLEAR_DATA:
      return {
        ...state,
        data: {},
        isLoading: false,
        hasError: false,
      }
    case Types.OPEN_ACCOUNT_EXTRACT_LAYER:
      return {
        ...state,
        isLayerOpen: true
      }
    case Types.CLOSE_ACCOUNT_EXTRACT_LAYER:
      return {
        ...state,
        isLayerOpen: false
      }
    default:
      return state
  }
}
