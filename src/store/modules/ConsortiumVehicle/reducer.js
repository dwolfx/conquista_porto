import { Types } from './types'

const INITIAL_STATE = {
  status: '',
  data: [],
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: [...action.payload],
      }
    default:
      return state
  }
}
