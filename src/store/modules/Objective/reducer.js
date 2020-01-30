import { Types } from './types'

const INITIAL_STATE = {
  data: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case Types.POST_FAILURE:
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}
