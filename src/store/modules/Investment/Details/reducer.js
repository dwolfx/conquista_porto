import { Types } from './types'

const INITIAL_STATE = {
  data: {},
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.INVESTMENT_DETAILS_ADD_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state
  }
}
