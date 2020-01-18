import { Types } from './types'

const INITIAL_STATE = {
  data: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.PRIVATE_WELFARE_GET_DATA_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
      }
    case Types.PRIVATE_WELFARE_GET_DATA_FAILURE:
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}
