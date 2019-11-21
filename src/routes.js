import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'

import Home from './pages/Home'
import Investimentos from './pages/Investments'
import CartaoCredito from './pages/CreditCard'
import PrevidenciaPrivada from './pages/PrivateWelfare'
import Points from './pages/Points'
import Profile from './pages/Profile'
import ConsortiumBuilding from './pages/ConsortiumBuilding'
import ConsortiumVehicle from './pages/ConsortiumVehicle'
import ProfileRegistration from './pages/Profile/Wizard/Registration'
import ProfileSuitability from './pages/Profile/Wizard/Suitability'
import PointsStatement from './pages/Points/Statement'

const DefaultRoute = ({ component, ...props }) => {
  const Component = component

  return (
    <>
      <Header />
      <main className="main-content">
        <Route {...props}>
          <Component />
        </Route>
      </main>
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
      <DefaultRoute
        path="/previdencia-privada"
        component={PrevidenciaPrivada}
      />
      <DefaultRoute path="/pontos" component={Points} />
      <DefaultRoute path="/perfil" exact component={Profile} />
      <DefaultRoute
        path="/consorcio-imovel"
        exact
        component={ConsortiumBuilding}
      />
      <DefaultRoute
        path="/consorcio-veiculo"
        exact
        component={ConsortiumVehicle}
      />
      <DefaultRoute path="/pontos/extrato" exact component={PointsStatement} />
      <Route path="/perfil/cadastro" exact component={ProfileRegistration} />
      <Route
        path="/perfil/investidor-perfil"
        exact
        component={ProfileSuitability}
      />
      <DefaultRoute path="/consorcio-imovel" component={ConsortiumBuilding} />
    </Switch>
  )
}
