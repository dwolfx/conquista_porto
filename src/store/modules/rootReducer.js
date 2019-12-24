import { combineReducers } from 'redux'

import creditCard from './CreditCard/reducer'
import investmentsDetails from './Investment/Details/reducer'

export default combineReducers({
  creditCard,
  investmentsDetails,
})
