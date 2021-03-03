import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import { AxiosResponse } from 'axios'
import { CEPResponse } from 'pages/CreditCard/Creation/types'
import { IGetZipCodeeDataRequestAction, ZipCodeType } from './types'
import { GetZipCodeeDataFailure, GetZipCodeeDataSuccess } from './action'

export function* getData({ payload }: IGetZipCodeeDataRequestAction) {
  try {
    const [cepPrefix, cepSufix] = payload.split('-')

    const { data }: AxiosResponse<CEPResponse> = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cliente/endereco`,
      {
        params: { cep: cepPrefix, cepSufixo: cepSufix },
      }
    )

    yield put(GetZipCodeeDataSuccess(data))
  } catch (err) {
    yield put(GetZipCodeeDataFailure())
  }
}

export default all([takeLatest(ZipCodeType.GET_DATA_REQUEST, getData)])
