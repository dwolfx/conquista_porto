import { combineReducers } from 'redux'

import creditCard from './CreditCard/reducer'
import investmentsDetails from './Investment/Details/reducer'
import privateWelfare from './PrivateWelfare/reducer'

export default combineReducers({
  creditCard,
  investmentsDetails,
  privateWelfare,
})
