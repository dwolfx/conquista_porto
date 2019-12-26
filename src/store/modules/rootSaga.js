import { all } from 'redux-saga/effects'

import creditCard from './CreditCard/sagas'
import privateWelfare from './PrivateWelfare/sagas'
import bankData from './BankData/sagas'

export default function* rootSaga() {
  return yield all([creditCard, privateWelfare, bankData])
}
