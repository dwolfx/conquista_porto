import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  hasError: false,
  isLoading: false,
}

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.CREDIT_CARD_OCCUPATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.CREDIT_CARD_OCCUPATION_SUCCESS:
      return {
        data: { ...action.payload },
        isLoading: false,
        hasError: false,
      }
    case Types.CREDIT_CARD_OCCUPATION_FAILURE:
      return {
        data: null,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
