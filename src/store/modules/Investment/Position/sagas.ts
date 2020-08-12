import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceAtlas } from 'services/api'

import { GetPositionDataSuccess, GetPositionDataFailure } from './action'
import { Types } from './types'
import { AxiosResponse } from 'axios'
import { IDistribution, IFund } from './iPositions'

interface IPayload {
  type: string
}

function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceAtlas}/cotista/posicao`
    )

    let responseData

    if (!isValidResponse(response)) {
      responseData = []
    } else {
      responseData = response.data.distribuicoes
        .map((distribution: IDistribution) =>
          distribution.fundos.map(fundo => ({ categoria: distribution.nome, ...fundo }))
        )
        .flatMap((fund: IFund) => fund)
    }
    yield put(GetPositionDataSuccess(responseData))
  } catch (err) {
    yield put(GetPositionDataFailure())
  }
}

export default all([takeLatest(Types.POSITION_GET_DATA_REQUEST, getData)])

const isValidResponse = (response: AxiosResponse) => {
  if (
    (response && response.data.Mensagem) ||
    response.data.TipoCritica === 'CRITICA_NEGOCIO' ||
    !response.data.distribuicoes
  ) {
    return false
  }

  return true
}
