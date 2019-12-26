import { all } from 'redux-saga/effects'

import creditCard from './CreditCard/sagas'
import investmentsDetails from './Investment/sagas'

export default function* rootSaga() {
  return yield all([creditCard, investmentsDetails])
}
