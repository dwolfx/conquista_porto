import { IToast } from 'hooks/toast'
import {
  Types,
  IProposalSimulationsRequest,
  IProposalSimulationsResponse,
} from './types'

export function PostProposalSimulationsRequest({
  payload,
  onErrorToast,
  onSuccess,
}: {
  payload: IProposalSimulationsRequest
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
  onSuccess: () => void
}) {
  return {
    type: Types.POST_PROPOSAL_SIMULATIONS_REQUEST,
    payload,
    onErrorToast,
    onSuccess,
  }
}

export function PostProposalSimulationsuccess(
  payload: IProposalSimulationsResponse
) {
  return {
    type: Types.POST_PROPOSAL_SIMULATIONS_SUCCESS,
    payload,
  }
}

export function PostProposalSimulationsFailure() {
  return {
    type: Types.POST_PROPOSAL_SIMULATIONS_FAILURE,
  }
}
