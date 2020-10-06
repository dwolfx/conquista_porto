import { Types } from './types'

const INITIAL_STATE = {
  data: {},
  isLayerOpen: false
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
      }
    case Types.CLEAR_DATA:
      return {
        ...state,
        data: {},
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
