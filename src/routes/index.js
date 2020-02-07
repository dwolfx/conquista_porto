import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import HeaderNew from 'components/HeaderNew'
// import Header from 'components/Header'
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
import RedirectComponent from 'pages/Redirect'

import Objectives from 'pages/Objectives'
import ObjectivesManager from 'pages/Objectives/Manager'

import Notifications from 'pages/Notifications'
import Login from 'pages/Login'

import useFetchCreditCard from 'hooks/CreditCard/useFetchCreditCard'
import useFetchTripInsurance from 'hooks/TripInsurance/useFetchTripInsurance'
import useFetchConsortiumVehicle from 'hooks/ConsortiumVehicle/useFetchConsortiumVehicle'
import useFetchConsortiumBuilding from 'hooks/ConsortiumBuilding/useFetchConsortiumBuilding'
import useFetchLifeInsurance from 'hooks/LifeInsurance/useFetchLifeInsurance'
import useFetchVehicleFinancing from 'hooks/VehicleFinancing/useFetchVehicleFinancing'
import useFetchPosition from 'hooks/Investments/useFetchPosition'
import IconComponent from 'components/IconExporter'
import useAuth from './auth'

const DefaultRoute = ({ component: Component, data, hook, ...rest }) => {
  let dataLength = 0

  try {
    if (!data) {
      hook()

      // while the hook is being called, dont render anything (eliminates blink between screens)
      return (
        <>
          <IconComponent name="loading" />
        </>
      )
    }

    dataLength = Array.isArray(data) ? data.length : Object.entries(data).length
  } catch (error) {
    dataLength = 0
  }

  return (
    <>
      <HeaderNew />
      <main className="main-content">
        <Route
          {...rest}
          render={props => {
            // if dataLength !== 0, data exists therefore redirects to management screen
            if (dataLength) {
              return <Redirect to={{ pathname: `${rest.path}/visualizar` }} />
            }

            // otherwise, renders the component
            return <Component {...props} />
          }}
        />
      </main>
      <Footer />
    </>
  )
}

DefaultRoute.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  hook: PropTypes.func,
}

DefaultRoute.defaultProps = {
  data: [],
  hook: () => {},
}

export default function Routes({ ...props }) {
  const {
    creditCardData,
    tripInsuranceData,
    vehicleFinancingData,
    consortiumBuildingData,
    consortiumVehicleData,
    lifeInsuranceData,
    positionData,
  } = useSelector(state => ({
    creditCardData: state.creditCard.data,
    tripInsuranceData: state.tripInsurance.data,
    vehicleFinancingData: state.vehicleFinancing.data,
    consortiumBuildingData: state.consortiumBuilding.data,
    consortiumVehicleData: state.consortiumVehicle.data,
    lifeInsuranceData: state.lifeInsurance.data,
    positionData: state.investmentPosition.data,
  }))

  const isAuth = useAuth()

  return !isAuth ? (
    <Login />
  ) : (
    <Switch {...props}>
      <DefaultRoute path="/" exact component={Home} />

      <DefaultRoute
        path="/cartao-credito"
        exact
        component={CartaoCredito}
        data={creditCardData}
        hook={useFetchCreditCard}
      />
      <DefaultRoute
        path="/seguro-viagem"
        exact
        component={TripInsurance}
        data={tripInsuranceData}
        hook={useFetchTripInsurance}
      />
      <DefaultRoute
        path="/financiamento-veiculo"
        exact
        component={VehicleFinancing}
        data={vehicleFinancingData}
        hook={useFetchVehicleFinancing}
      />
      <DefaultRoute
        path="/consorcio-imovel"
        exact
        component={ConsortiumBuilding}
        data={consortiumBuildingData}
        hook={useFetchConsortiumBuilding}
      />
      <DefaultRoute
        path="/consorcio-veiculo"
        exact
        component={ConsortiumVehicle}
        data={consortiumVehicleData}
        hook={useFetchConsortiumVehicle}
      />
      <DefaultRoute
        path="/seguro-vida"
        exact
        component={SeguroVida}
        data={lifeInsuranceData}
        hook={useFetchLifeInsurance}
      />
      <DefaultRoute
        path="/investimentos"
        exact
        component={Investimentos}
        data={positionData}
        hook={useFetchPosition}
      />

      <DefaultRoute
        path="/cartao-credito/visualizar"
        exact
        component={ManagementCreditCard}
      />
      <DefaultRoute
        path="/seguro-viagem/visualizar"
        component={ManagementTripInsurance}
      />
      <DefaultRoute
        path="/financiamento-veiculo/visualizar"
        exact
        component={ManagementVehicleFinancing}
      />
      <DefaultRoute
        path="/consorcio-imovel/visualizar"
        exact
        component={ManagementConsortiumBuilding}
      />
      <DefaultRoute
        path="/consorcio-veiculo/visualizar"
        exact
        component={ManagementConsortiumVehicle}
      />
      <DefaultRoute
        path="/investimentos/visualizar"
        component={ManagementInvestimentos}
      />
      <DefaultRoute
        path="/seguro-vida/visualizar"
        exact
        component={ManagementSeguroVida}
      />

      <Route
        path="/investimentos/extrato"
        exact
        component={InvestimentosExtrato}
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
      <DefaultRoute path="/pontos" exact component={Points} />
      <DefaultRoute path="/perfil" exact component={Profile} />

      <DefaultRoute path="/pontos/extrato" exact component={PointsStatement} />
      <DefaultRoute
        path="/objetivos/gerenciar"
        exact
        component={ObjectivesManager}
      />
      <Route path="/objetivos" component={Objectives} />
      <Route path="/perfil/cadastro" exact component={ProfileRegistration} />
      <Route
        path="/perfil/investidor-perfil"
        exact
        component={ProfileSuitability}
      />
      <Route path="/redirect" exact component={RedirectComponent} />
      <DefaultRoute path="/notificacoes" exact component={Notifications} />
    </Switch>
  )
}
