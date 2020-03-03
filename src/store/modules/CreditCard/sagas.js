import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import { GetCreditCardDataSuccess, GetCreditCardDataFailure } from './action'

function* getData({ cpf }) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/cartoes?cpfCnpj=${cpf}&codigoCanal=0`
    )
    yield put(GetCreditCardDataSuccess(response.data))
  } catch (err) {
    yield put(GetCreditCardDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
