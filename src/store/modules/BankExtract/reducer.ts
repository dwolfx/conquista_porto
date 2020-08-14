import { Types } from './types'

const INITIAL_STATE = {
  data: {},
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
      }
    case Types.CLEAR_DATA:
      return {
        ...state,
        data: {},
      }
    default:
      return state
  }
}
