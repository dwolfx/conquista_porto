import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  status: '',
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.BANK_DATA_GET_DATA_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: action.payload,
      }
    case Types.BANK_DATA_GET_DATA_FAILURE:
      return {
        ...state,
        data: {},
      }
    default:
      return state
  }
}
