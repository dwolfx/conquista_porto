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

    if (data?.Message?.TipoCritica === 'CRITICA_NEGOCIO') {
      console.error(data)
      throw new Error(`Erro ao efetuar chamada '/viagem/proposta'`)
    }

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
