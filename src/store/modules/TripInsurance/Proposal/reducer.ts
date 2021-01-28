import { Types, IAction, ITripInsuranceProposal } from './types'

const INITIAL_STATE: ITripInsuranceProposal = {
  data: null,
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action: IAction) {
  switch (action.type) {
    case Types.POST_TRIP_INSURANCE_PROPOSAL_REQUEST:
      return {
        data: null,
        isLoading: true,
        hasError: false,
      }
    case Types.POST_TRIP_INSURANCE_PROPOSAL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.POST_TRIP_INSURANCE_PROPOSAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
