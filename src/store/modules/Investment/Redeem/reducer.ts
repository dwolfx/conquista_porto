import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  hasError: false,
  isLayerOpen: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.REDEEM_DATA_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.REDEEM_DATA_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.REDEEM_DATA_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    case Types.REDEEM_LAYER_OPEN:
      return {
        ...state,
        isLayerOpen: true,
      }
    case Types.REDEEM_LAYER_CLOSE:
      return {
        ...state,
        isLayerOpen: false,
      }
    default:
      return state
  }
}
