import { combineReducers } from 'redux'

import creditCard from './CreditCard/reducer'
import privateWelfare from './PrivateWelfare/reducer'

export default combineReducers({
  creditCard,
  privateWelfare,
})
