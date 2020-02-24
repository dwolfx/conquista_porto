import { Types } from './types'

const INITIAL_STATE = {
  isLoading: false,
  data: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_SUCCESS:
      return {
        data: { ...action.payload },
        isLoading: false,
      }
    case Types.GET_NO_CONTENT: {
      return {
        data: null,
        isLoading: false,
      }
    }
    case Types.GET_FAILURE:
      return {
        data: null,
        isLoading: false,
      }
    case Types.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    default:
      return state
  }
}
