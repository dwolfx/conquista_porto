import { combineReducers } from 'redux'

import creditCard from './CreditCard/reducer'
import investmentsDetails from './Investment/Details/reducer'
import privateWelfare from './PrivateWelfare/reducer'
import bankData from './BankData/reducer'

export default combineReducers({
  creditCard,
  investmentsDetails,
  privateWelfare,
  bankData,
})
