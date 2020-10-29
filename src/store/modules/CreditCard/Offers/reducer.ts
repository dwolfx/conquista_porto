import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  hasError: false,
  isLoading: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_CREDIT_CARD_OFFERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.GET_CREDIT_CARD_OFFERS_SUCCESS:
      return {
        ...state,
        data: {...action.payload},
        isLoading: false,
      }
    case Types.GET_CREDIT_CARD_OFFERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
