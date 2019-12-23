import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import Header from 'components/Header'
import Footer from 'components/Footer'

import Home from 'pages/Home'
import Investimentos from 'pages/Investments'
import InvestmentsFunds from 'pages/Investments/FundsList'
import ManagementInvestimentos from 'pages/Investments/Management'
import InvestimentosExtrato from 'pages/Investments/Extract'
import PrevidenciaPrivada from 'pages/PrivateWelfare'
import Points from 'pages/Points'
import Profile from 'pages/Profile'
import VehicleFinancing from 'pages/VehicleFinancing'
import TripInsurance from 'pages/TripInsurance'
import ProfileRegistration from 'pages/Profile/Wizard/Registration'
import ProfileSuitability from 'pages/Profile/Wizard/Suitability'
import PointsStatement from 'pages/Points/Statement'
import ConsortiumVehicle from 'pages/ConsortiumVehicle'
import ManagementConsortiumVehicle from 'pages/ConsortiumVehicle/Management'
import ConsortiumBuilding from 'pages/ConsortiumBuilding'
import ManagementConsortiumBuilding from 'pages/ConsortiumBuilding/Management'
import CartaoCredito from 'pages/CreditCard'
import ManagementCreditCard from 'pages/CreditCard/Management'
import SeguroVida from 'pages/LifeInsurance'
import ManagementSeguroVida from 'pages/LifeInsurance/Management'
import Objectives from 'pages/Objectives'
import ObjectivesRegistration from 'pages/Objectives/Registration'

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
      <DefaultRoute path="/investimentos" exact component={Investimentos} />
      <Route
        path="/investimentos/extrato"
        exact
        component={InvestimentosExtrato}
      />
      <DefaultRoute path="/cartao-credito" exact component={CartaoCredito} />
      <DefaultRoute path="/seguro-vida" exact component={SeguroVida} />
      <DefaultRoute path="/investimentos" exact component={Investimentos} />
      <DefaultRoute
        path="/investimentos/visualizar"
        component={ManagementInvestimentos}
      />
      <DefaultRoute
        path="/seguro-vida/visualizar"
        exact
        component={ManagementSeguroVida}
      />
      <DefaultRoute path="/investimentos" exact component={Investimentos} />
      <DefaultRoute
        path="/investimentos/lista-fundos"
        component={InvestmentsFunds}
      />
      <DefaultRoute
        path="/previdencia-privada"
        exact
        component={PrevidenciaPrivada}
      />
      <DefaultRoute
        path="/cartao-credito/visualizar"
        exact
        component={ManagementCreditCard}
      />
      <DefaultRoute path="/pontos" exact component={Points} />
      <DefaultRoute path="/perfil" exact component={Profile} />
      <DefaultRoute
        path="/consorcio-imovel"
        exact
        component={ConsortiumBuilding}
      />
      <DefaultRoute
        path="/consorcio-imovel/visualizar"
        exact
        component={ManagementConsortiumBuilding}
      />
      <DefaultRoute
        path="/consorcio-veiculo"
        exact
        component={ConsortiumVehicle}
      />

      <DefaultRoute
        path="/consorcio-veiculo/visualizar"
        exact
        component={ManagementConsortiumVehicle}
      />
      <DefaultRoute
        path="/financiamento-veiculo"
        exact
        component={VehicleFinancing}
      />
      <DefaultRoute path="/seguro-viagem" exact component={TripInsurance} />
      <DefaultRoute path="/pontos/extrato" exact component={PointsStatement} />
      <DefaultRoute path="/objetivos" exact component={Objectives} />
      <Route path="/objetivos/criar" exact component={ObjectivesRegistration} />
      <Route path="/perfil/cadastro" exact component={ProfileRegistration} />
      <Route
        path="/perfil/investidor-perfil"
        exact
        component={ProfileSuitability}
      />
    </Switch>
  )
}
