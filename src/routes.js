import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Investimentos from './pages/Investments'
import CartaoCredito from './pages/CreditCard'
import PrevidenciaPrivada from './pages/PrivateWelfare'
import SeguroVida from './pages/LifeInsurance'
import ManagementCreditCard from './pages/CreditCard/Management'
import Points from './pages/Points'
import Profile from './pages/Profile'
import ConsortiumBuilding from './pages/ConsortiumBuilding'
import ConsortiumVehicle from './pages/ConsortiumVehicle'
import VehicleFinancing from './pages/VehicleFinancing'
import TripInsurance from './pages/TripInsurance'
import ProfileRegistration from './pages/Profile/Wizard/Registration'
import ProfileSuitability from './pages/Profile/Wizard/Suitability'
import PointsStatement from './pages/Points/Statement'

const DefaultRoute = ({ component, ...rest }) => {
  const Component = component
  return (
    <>
      <Header />
      <main className="main-content">
        <Route {...rest} render={props => <Component {...props} />} />
      </main>
      <Footer />
    </>
  )
}

DefaultRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default function Routes({ ...props }) {
  return (
    <Switch {...props}>
      <DefaultRoute path="/" exact component={Home} />
      <DefaultRoute path="/investimentos" component={Investimentos} />
      <DefaultRoute path="/cartao-credito" exact component={CartaoCredito} />
      <DefaultRoute path="/seguro-vida" component={SeguroVida} />
      <DefaultRoute
        path="/previdencia-privada"
        component={PrevidenciaPrivada}
      />
      <DefaultRoute
        path="/cartao-credito/visualizar"
        component={ManagementCreditCard}
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
      <DefaultRoute
        path="/financiamento-veiculo"
        exact
        component={VehicleFinancing}
      />
      <DefaultRoute path="/seguro-viagem" exact component={TripInsurance} />
      <DefaultRoute path="/pontos/extrato" exact component={PointsStatement} />
      <Route path="/perfil/cadastro" exact component={ProfileRegistration} />
      <Route
        path="/perfil/investidor-perfil"
        exact
        component={ProfileSuitability}
      />
    </Switch>
  )
}
