import { all } from 'redux-saga/effects'

import creditCard from './CreditCard/sagas'
import consortiumBuilding from './ConsortiumBuilding/sagas'
import privateWelfare from './PrivateWelfare/sagas'

export default function* rootSaga() {
  return yield all([creditCard, privateWelfare, consortiumBuilding])
}
