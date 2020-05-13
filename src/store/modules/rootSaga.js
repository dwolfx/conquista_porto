/* eslint-disable import/no-cycle */
import { all } from 'redux-saga/effects'

import bankData from './BankData/sagas'
import bankExtract from './BankExtract/sagas'
import bankExtractFund from './BankExtractFund/sagas'
import creditCard from './CreditCard/sagas'
import consolidatedPosition from './ConsolidatedPosition/sagas'
import consortiumBuilding from './ConsortiumBuilding/sagas'
import consortiumVehicle from './ConsortiumVehicle/sagas'
import investmentsList from './Investment/sagas'
import investmentDetails from './Investment/Details/sagas'
import investmentPosition from './Investment/Position/sagas'
import lifeInsurance from './LifeInsurance/sagas'
import points from './Points/sagas'
import privateWelfare from './PrivateWelfare/sagas'
import tripInsurance from './TripInsurance/sagas'
import vehicleFinancing from './VehicleFinancing/sagas'
import notifications from './Notifications/sagas'
import auth from './Auth/sagas'
import objective from './Objective/sagas'
import objectiveManagement from './ObjectiveManagement/sagas'
import suitability from './Suitability/sagas'
import suitabilityInfo from './SuitabilityInfo/sagas'

export default function* rootSaga() {
  return yield all([
    bankData,
    bankExtract,
    bankExtractFund,
    creditCard,
    consolidatedPosition,
    consortiumBuilding,
    consortiumVehicle,
    investmentsList,
    investmentDetails,
    investmentPosition,
    lifeInsurance,
    points,
    privateWelfare,
    tripInsurance,
    vehicleFinancing,
    notifications,
    auth,
    objective,
    objectiveManagement,
    suitability,
    suitabilityInfo,
  ])
}
