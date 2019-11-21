import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'

import Home from './pages/Home'
import Investimentos from './pages/Investments'
import Profile from './pages/Profile'
import Points from './pages/Points'
import ConsortiumBuilding from './pages/ConsortiumBuilding'
import ConsortiumVehicle from './pages/ConsortiumVehicle'
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
      <DefaultRoute path="/investimentos" exact component={Investimentos} />
      <DefaultRoute path="/pontos" exact component={Points} />
      <DefaultRoute path="/perfil" exact component={Profile} />
      <DefaultRoute path="/consorcio-imovel" exact component={ConsortiumBuilding} />
      <DefaultRoute path="/consorcio-veiculo" exact component={ConsortiumVehicle} />
      <Route path="/perfil/cadastro" exact component={ProfileRegistration} />
      <Route path="/perfil/investidor-perfil" exact component={ProfileSuitability} />
    </Switch>
  )
}
