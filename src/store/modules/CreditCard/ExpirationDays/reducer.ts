import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  hasError: false,
  isLoading: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.CREDIT_CARD_EXPIRATION_DAYS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.CREDIT_CARD_EXPIRATION_DAYS_SUCCESS:
      return {
        ...state,
        data: {...action.payload},
        isLoading: false,
      }
    case Types.CREDIT_CARD_EXPIRATION_DAYS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    case Types.CREDIT_CARD_EXPIRATION_DAYS_CLEAR_DATA:
      return {
        ...INITIAL_STATE
      }
    default:
      return state
  }
}
