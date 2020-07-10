/* eslint-disable import/no-cycle */
import { all } from 'redux-saga/effects'

import alignmentTerms from './Investment/FinantialApplication/AlignmentTerms/sagas'
import bankData from './BankData/sagas'
import bankExtract from './BankExtract/sagas'
import bankExtractFund from './BankExtractFund/sagas'
import creditCard from './CreditCard/sagas'
import consolidatedPosition from './ConsolidatedPosition/sagas'
import consortiumBuilding from './ConsortiumBuilding/sagas'
import consortiumVehicle from './ConsortiumVehicle/sagas'
import customerProfile from './CustomerProfile/sagas'
import {
  finantialApplicationGetData,
  finantialApplicationPostData,
} from './Investment/FinantialApplication/sagas'
import investmentsList from './Investment/sagas'
import investmentDetails from './Investment/Details/sagas'
import investmentPosition from './Investment/Position/sagas'
import isAwareOfTerms from './Investment/FinantialApplication/IsAwareOfTerms/sagas'
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
import rewardsRecommendations from './Rewards/Recommendations/sagas'
import rewardsTypes from './Rewards/Types/sagas'
import virtualKeyboard from './VirtualKeyboard/sagas'
import token2fa from './2FAToken/sagas'

export default function* rootSaga() {
  return yield all([
    alignmentTerms,
    bankData,
    bankExtract,
    bankExtractFund,
    creditCard,
    consolidatedPosition,
    consortiumBuilding,
    consortiumVehicle,
    customerProfile,
    finantialApplicationGetData,
    finantialApplicationPostData,
    investmentsList,
    investmentDetails,
    investmentPosition,
    isAwareOfTerms,
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
    rewardsRecommendations,
    rewardsTypes,
    virtualKeyboard,
    token2fa,
  ])
}
