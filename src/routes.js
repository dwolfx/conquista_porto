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
import ManagementVehicleFinancing from 'pages/VehicleFinancing/Management'
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
import ManagementTripInsurance from 'pages/TripInsurance/Management'
import Redirect from 'pages/Redirect'

import Objectives from 'pages/Objectives'
import ObjectivesRetirementFlow from 'pages/Objectives/GoalStreams/RetirementFlow'
import ObjectivesTravelFlow from 'pages/Objectives/GoalStreams/TravelFlow'
import ObjectivesBuyCarFlow from 'pages/Objectives/GoalStreams/BuyCarFlow'
import ObjectivesStudyFlow from 'pages/Objectives/GoalStreams/StudyFlow'
import ObjectivesMultiplyMoneyFlow from 'pages/Objectives/GoalStreams/MultiplyMoneyFlow'
import ObjectivesEventFlow from 'pages/Objectives/GoalStreams/EventFlow'
import ObjectivesBuyHouseFlow from 'pages/Objectives/GoalStreams/BuyHouseFlow'
import ObjectivesSaveMoneyFlow from 'pages/Objectives/GoalStreams/SaveMoneyFlow'
import ObjectivesRecommendation from 'pages/Objectives/Recommendation'
import Notifications from 'pages/Notifications'

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
      <DefaultRoute
        path="/financiamento-veiculo/visualizar"
        exact
        component={ManagementVehicleFinancing}
      />
      <DefaultRoute path="/seguro-viagem" exact component={TripInsurance} />
      <DefaultRoute
        path="/seguro-viagem/visualizar"
        component={ManagementTripInsurance}
      />
      <DefaultRoute path="/pontos/extrato" exact component={PointsStatement} />
      <Route path="/objetivos" exact component={Objectives} />
      <Route
        path="/objetivos/aposentar"
        exact
        component={ObjectivesRetirementFlow}
      />
      <Route path="/objetivos/viagem" exact component={ObjectivesTravelFlow} />
      <Route path="/objetivos/carro" exact component={ObjectivesBuyCarFlow} />
      <Route path="/objetivos/curso" exact component={ObjectivesStudyFlow} />
      <Route
        path="/objetivos/dinheiro"
        exact
        component={ObjectivesMultiplyMoneyFlow}
      />
      <Route path="/objetivos/evento" exact component={ObjectivesEventFlow} />
      <Route path="/objetivos/casa" exact component={ObjectivesBuyHouseFlow} />
      <Route
        path="/objetivos/reserva"
        exact
        component={ObjectivesSaveMoneyFlow}
      />
      <Route
        path="/objetivos/recomendacao"
        exact
        component={ObjectivesRecommendation}
      />
      <Route path="/perfil/cadastro" exact component={ProfileRegistration} />
      <Route
        path="/perfil/investidor-perfil"
        exact
        component={ProfileSuitability}
      />
      <Route path="/redirect" exact component={Redirect} />
      <DefaultRoute path="/notificacoes" exact component={Notifications} />
    </Switch>
  )
}
