import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  hasError: false,
  isLoading: false,
  isCreationLayerOpen: false
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.GET_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
      }
    case Types.GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    case Types.OPEN_CREDIT_CARD_CREATION:
      return {
        ...state,
        isCreationLayerOpen: true
      }
    case Types.CLOSE_CREDIT_CARD_CREATION:
      return {
        ...state,
        isCreationLayerOpen: false
      }
    default:
      return state
  }
}
