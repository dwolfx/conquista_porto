import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Investimentos from './pages/Investments'
import CartaoCredito from './pages/CreditCard'
import Points from './pages/Points'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/investimentos" component={Investimentos} />
      <Route path="/cartao-credito" component={CartaoCredito} />
      <Route path="/pontos" exact component={Points} />
    </Switch>
  )
}
