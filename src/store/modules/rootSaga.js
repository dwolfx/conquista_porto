import { all } from 'redux-saga/effects'

import creditCard from './CreditCard/sagas'

export default function* rootSaga() {
  return yield all([creditCard])
}
