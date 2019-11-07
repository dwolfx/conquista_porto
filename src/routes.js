import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Investimentos from './pages/Investments'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/investimentos" exact component={Investimentos} />
    </Switch>
  )
}
