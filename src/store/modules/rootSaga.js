import { all } from 'redux-saga/effects'

import creditCard from './CreditCard/sagas'
import consortiumBuilding from './ConsortiumBuilding/sagas'
import consortiumVehicle from './ConsortiumVehicle/sagas'
import investmentsDetails from './Investment/sagas'
import privateWelfare from './PrivateWelfare/sagas'

export default function* rootSaga() {
  return yield all([
    creditCard,
    consortiumBuilding,
    consortiumVehicle,
    investmentsDetails,
    privateWelfare,
  ])
}
