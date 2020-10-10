import { Types } from './types'

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  hasError: false,
  isLayerOpen: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_REQUEST: {
      return {
        ...state,
        data: [],
        hasError: false,
        isLoading: true,
      }
    }
    case Types.GET_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
        hasError: false,
      }
    case Types.GET_FAILURE:
      return {
        ...state,
        hasError: true,
        isLoading: false,
      }
    case Types.CLEAR_DATA:
      return {
        ...state,
        data: {},
      }
    case Types.OPEN_LAYER_EXTRATO:
      return {
        ...state,
        isLayerOpen: true,
      }
    case Types.CLOSE_LAYER_EXTRATO:
      return {
        ...state,
        isLayerOpen: false,
      }
    default:
      return state
  }
}
