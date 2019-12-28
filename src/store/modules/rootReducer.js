import { combineReducers } from 'redux'

import creditCard from './CreditCard/reducer'
import consortiumBuilding from './ConsortiumBuilding/reducer'
import consortiumVehicle from './ConsortiumVehicle/reducer'
import investmentsList from './Investment/reducer'
import investmentDetails from './Investment/Details/reducer'
import privateWelfare from './PrivateWelfare/reducer'
import bankData from './BankData/reducer'
import vehicleFinancing from './VehicleFinancing/reducer'
import lifeInsurance from './LifeInsurance/reducer'
import tripInsurance from './TripInsurance/reducer'
import points from './Points/reducer'

export default combineReducers({
  creditCard,
  investmentsList,
  investmentDetails,
  privateWelfare,
  bankData,
  lifeInsurance,
  consortiumBuilding,
  consortiumVehicle,
  vehicleFinancing,
  tripInsurance,
  points,
})
