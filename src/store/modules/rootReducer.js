import { combineReducers } from 'redux'

import bankData from './BankData/reducer'
import bankExtract from './BankExtract/reducer'
import bankExtractFund from './BankExtractFund/reducer'
import creditCard from './CreditCard/reducer'
import consolidatedPosition from './ConsolidatedPosition/reducer'
import consortiumBuilding from './ConsortiumBuilding/reducer'
import consortiumVehicle from './ConsortiumVehicle/reducer'
import customerProfile from './CustomerProfile/reducer'
import investmentsList from './Investment/reducer'
import investmentDetails from './Investment/Details/reducer'
import investmentPosition from './Investment/Position/reducer'
import privateWelfare from './PrivateWelfare/reducer'
import vehicleFinancing from './VehicleFinancing/reducer'
import lifeInsurance from './LifeInsurance/reducer'
import tripInsurance from './TripInsurance/reducer'
import points from './Points/reducer'
import notifications from './Notifications/reducer'
import auth from './Auth/reducer'
import objective from './Objective/reducer'
import objectiveManagement from './ObjectiveManagement/reducer'
import suitability from './Suitability/reducer'
import suitabilityInfo from './SuitabilityInfo/reducer'
import rewardsRecommendations from './Rewards/Recommendations/reducer'
import rewardsTypes from './Rewards/Types/reducer'
import virtualKeyboard from './VirtualKeyboard/reducer'
import token2fa from './2FAToken/reducer'

export default combineReducers({
  bankData,
  bankExtract,
  bankExtractFund,
  consortiumBuilding,
  consortiumVehicle,
  creditCard,
  customerProfile,
  investmentsList,
  investmentDetails,
  investmentPosition,
  privateWelfare,
  lifeInsurance,
  consolidatedPosition,
  vehicleFinancing,
  tripInsurance,
  notifications,
  points,
  auth,
  objective,
  objectiveManagement,
  suitability,
  suitabilityInfo,
  rewardsRecommendations,
  rewardsTypes,
  virtualKeyboard,
  token2fa,
})
