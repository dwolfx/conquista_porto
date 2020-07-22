import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  hasError: false,
  isLayerOpen: false,
}

export default function(
  state = INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    case Types.REDEEM_DATA_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.REDEEM_DATA_GET_SUCCESS:
      console.log(action.payload)
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
    case Types.REDEEM_LAYER_TOGGLE:
      return {
        ...state,
        isLayerOpen: !state.isLayerOpen
      }
    default:
      return state
  }
}
