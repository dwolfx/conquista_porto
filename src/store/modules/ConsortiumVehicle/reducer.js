import { Types } from './types'

const INITIAL_STATE = {
  status: '',
  data: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: [...action.payload],
      }
    case Types.GET_FAILURE:
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}
