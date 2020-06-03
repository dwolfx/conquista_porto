import { get, baseURLNamespaceInvest } from 'services/api'
import { GetDataSuccess, GetDataFailure } from './action'
import { all, takeLatest, call, put } from 'redux-saga/effects'
import { Types } from './types'

interface IPayload {
  type: string
  payload: {
    cpfCnpj: string
  }
}

function* getData({ payload }: IPayload) {
  const { cpfCnpj } = payload
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/perfil/dados-cliente?cpfCnpj=${cpfCnpj}`
    )
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put({
      ...GetDataFailure(),
    })
  }
}

export default all([
  takeLatest(Types.CUSTOMER_PROFILE_GET_DATA_REQUEST, getData),
])
