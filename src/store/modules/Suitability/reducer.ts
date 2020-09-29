import { Types } from './types'

const INITIAL_STATE = {
  isLoading: true,
  data: {},
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_SUCCESS:
      return {
        data: { ...action.payload },
        isLoading: false,
      }
    case Types.GET_NO_CONTENT: {
      return {
        data: {},
      }
    }
    case Types.GET_FAILURE:
      return {
        data: {},
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
