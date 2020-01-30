import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get } from 'services/api'
import { Types } from './types'
import { GetCreditCardDataSuccess, GetCreditCardDataFailure } from './action'

function* getData({ cpf, token }) {
  try {
    const response = yield call(
      get,
      `/cartoes?cpfCnpj=${cpf}&codigoCanal=0`,
      null,
      token
    )
    yield put(GetCreditCardDataSuccess(response.data))
  } catch (err) {
    yield put(GetCreditCardDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
