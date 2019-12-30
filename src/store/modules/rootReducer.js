import { combineReducers } from 'redux'

import creditCard from './CreditCard/reducer'
import consortiumBuilding from './ConsortiumBuilding/reducer'
import consortiumVehicle from './ConsortiumVehicle/reducer'
import investmentsDetails from './Investment/reducer'
import privateWelfare from './PrivateWelfare/reducer'
import bankData from './BankData/reducer'

export default combineReducers({
  creditCard,
  investmentsDetails,
  privateWelfare,
  bankData,
  consortiumBuilding,
  consortiumVehicle,
})
