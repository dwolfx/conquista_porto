import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Investimentos from './pages/Investments'
import Points from './pages/Points'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/investimentos" exact component={Investimentos} />
      <Route path="/pontos" exact component={Points} />
    </Switch>
  )
}
