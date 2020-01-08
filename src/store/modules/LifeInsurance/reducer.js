import { Types } from './types'

const INITIAL_STATE = {
  status: '',
  data: [],
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_DATA_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: [...action.payload.SeguroVida],
      }
    case Types.GET_DATA_FAILURE:
      return {
        ...state,
      }
    default:
      return state
  }
}
