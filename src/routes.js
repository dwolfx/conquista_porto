import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Investimentos from './pages/Investments'
import CreditCard from './pages/CreditCard'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/investimentos" component={Investimentos} />
      <Route path="/credit-card" component={CreditCard} />
    </Switch>
  )
}
