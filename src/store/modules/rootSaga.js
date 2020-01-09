import { all } from 'redux-saga/effects'

import creditCard from './CreditCard/sagas'
import consortiumBuilding from './ConsortiumBuilding/sagas'
import consortiumVehicle from './ConsortiumVehicle/sagas'
import investmentsDetails from './Investment/sagas'
import privateWelfare from './PrivateWelfare/sagas'
import bankData from './BankData/sagas'
import vehicleFinancing from './VehicleFinancing/sagas'
import lifeInsurance from './LifeInsurance/sagas'
import tripInsurance from './TripInsurance/sagas'
import points from './Points/sagas'

export default function* rootSaga() {
  return yield all([
    creditCard,
    consortiumBuilding,
    consortiumVehicle,
    investmentsDetails,
    privateWelfare,
    bankData,
    vehicleFinancing,
    lifeInsurance,
    tripInsurance,
    points,
  ])
}
