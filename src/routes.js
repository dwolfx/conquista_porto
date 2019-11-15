import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Investimentos from './pages/Investments'
import Consortium from './pages/Consortium'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/investimentos" component={Investimentos} />
      <Route path="/consortium" component={Consortium} />
    </Switch>
  )
}
