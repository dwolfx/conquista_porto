import { Types, InitialState } from './types'

const INITIAL_STATE: InitialState = {
  status: '',
  data: null,
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.GET_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: { ...action.payload.data },
        isLoading: false,
      }
    case Types.GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
