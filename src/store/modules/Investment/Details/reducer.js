import { Types } from './types'

const INITIAL_STATE = {
  data: {},
  isLoading: false,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.INVESTMENT_DETAILS_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.INVESTMENT_DETAILS_ADD_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
        isLoading: false,
      }
    case Types.INVESTMENT_DETAILS_ADD_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
