import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'

import Home from './pages/Home'
import Investimentos from './pages/Investments'
import CartaoCredito from './pages/CreditCard'
import Points from './pages/Points'
import Profile from './pages/Profile'
import ConsortiumBuilding from './pages/ConsortiumBuilding'
import ProfileRegistration from './pages/Profile/Wizard/Registration'
import ProfileSuitability from './pages/Profile/Wizard/Suitability'

const DefaultRoute = ({ component, ...props }) => {
  const Component = component

  return (
    <>
      <Header />
      <Route {...props}>
        <Component />
      </Route>
      <Footer />
    </>
  )
}

export default function Routes() {
  return (
    <Switch>
      <DefaultRoute path="/" exact component={Home} />
      <DefaultRoute path="/investimentos" component={Investimentos} />
      <DefaultRoute path="/cartao-credito" component={CartaoCredito} />
      <DefaultRoute path="/pontos" component={Points} />
      <DefaultRoute path="/perfil" exact component={Profile} />
      <Route path="/perfil/cadastro" component={ProfileRegistration} />
      <Route
        path="/perfil/investidor-perfil"
        exact
        component={ProfileSuitability}
      />
      <DefaultRoute path="/consorcio-imovel" component={ConsortiumBuilding} />
    </Switch>
  )
}
