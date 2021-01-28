import { all, takeLatest, call, put } from 'redux-saga/effects'

import { post, baseURLNamespaceInvestAws } from 'services/api'
import { Types, IPayload, ITripInsuranceProposalResponse } from './types'
import {
  PostTripInsuranceProposalSuccess,
  PostTripInsuranceProposalFailure,
} from './action'

export function* postTripInsuranceProposal({
  payload,
  onErrorToast,
  onSuccess,
  Step,
  setRetries,
}: IPayload) {
  try {
    const { data }: { data: ITripInsuranceProposalResponse } = yield call(
      post,
      `${baseURLNamespaceInvestAws}/viagem/proposta`,
      payload
    )

    yield put(PostTripInsuranceProposalSuccess(data))
    if (onSuccess && Step) onSuccess(Step)
  } catch (err) {
    yield put(PostTripInsuranceProposalFailure())
    setRetries()
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export default all([
  takeLatest(
    Types.POST_TRIP_INSURANCE_PROPOSAL_REQUEST,
    postTripInsuranceProposal
  ),
])
