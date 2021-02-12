import { all, takeLatest, call, put } from 'redux-saga/effects'

import { post, baseURLNamespaceConsortiumBuilding } from 'services/api'
import { Types, IPayload, IProposalSimulationsResponse } from './types'
import {
  PostProposalSimulationsuccess,
  PostProposalSimulationsFailure,
} from './action'

export function* postProposalSimulations({
  payload,
  onErrorToast,
  onSuccess,
}: IPayload) {
  try {
    const { data }: { data: IProposalSimulationsResponse } = yield call(
      post,
      `${baseURLNamespaceConsortiumBuilding}/proposta/simular`,
      payload
    )

    yield put(
      PostProposalSimulationsuccess({
        ...data,
      })
    )
    if (onSuccess) onSuccess()
  } catch (err) {
    yield put(PostProposalSimulationsFailure())
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export default all([
  takeLatest(Types.POST_PROPOSAL_SIMULATIONS_REQUEST, postProposalSimulations),
])
