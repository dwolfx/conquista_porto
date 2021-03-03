import { StepComponentProps } from 'hooks/FluxManagement/types'
import { IToast } from 'hooks/toast'
import {
  Types,
  ITripInsuranceProposalRequest,
  ITripInsuranceProposalResponse,
} from './types'

export function PostTripInsuranceProposalRequest({
  payload,
  onErrorToast,
  onSuccess,
  Step,
  setRetries,
}: {
  payload: ITripInsuranceProposalRequest
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
  onSuccess?: (element: React.FC<StepComponentProps>) => void
  Step?: React.FC<StepComponentProps>
  setRetries: () => void
}) {
  return {
    type: Types.POST_TRIP_INSURANCE_PROPOSAL_REQUEST,
    payload,
    onErrorToast,
    onSuccess,
    Step,
    setRetries,
  }
}

export function PostTripInsuranceProposalSuccess(
  payload: ITripInsuranceProposalResponse
) {
  return {
    type: Types.POST_TRIP_INSURANCE_PROPOSAL_SUCCESS,
    payload,
  }
}

export function PostTripInsuranceProposalFailure() {
  return {
    type: Types.POST_TRIP_INSURANCE_PROPOSAL_FAILURE,
  }
}
