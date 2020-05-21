import { get } from 'services/api'
import { GetDataSuccess, GetDataFailure } from './action'
import { all, takeLatest, call, put } from 'redux-saga/effects'
import { Types } from './types'

interface IPayload {
  type: string
  payload: {
    cpf: string
  }
}

function* getData({ payload }: IPayload) {
  const { cpf } = payload
  try {
    const response = yield call(
      get,
      // verificar como chamar esta url corretamente...
      `https://apihml.portoseguro.brasil:8443/investimento/v1/perfil/dados-cliente?cpfCnpj=${cpf}`
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
