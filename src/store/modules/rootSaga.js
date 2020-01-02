import { all } from 'redux-saga/effects'

import creditCard from './CreditCard/sagas'
import consortiumBuilding from './ConsortiumBuilding/sagas'
import consortiumVehicle from './ConsortiumVehicle/sagas'
import investmentsDetails from './Investment/sagas'
import privateWelfare from './PrivateWelfare/sagas'
import bankData from './BankData/sagas'
import lifeInsurance from './LifeInsurance/sagas'
import tripInsurance from './TripInsurance/sagas'

export default function* rootSaga() {
  return yield all([
    creditCard,
    consortiumBuilding,
    consortiumVehicle,
    investmentsDetails,
    privateWelfare,
    bankData,
    lifeInsurance,
    tripInsurance,
  ])
}
