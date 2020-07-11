import { Types, IAlignmentTermsAction } from '../types'

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action: IAlignmentTermsAction) {
  switch (action.type) {
    case Types.ALIGNMENT_TERMS_DATA_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.ALIGNMENT_TERMS_DATA_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.ALIGNMENT_TERMS_DATA_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
