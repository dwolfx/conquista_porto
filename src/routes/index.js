import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Switch,
  Route as ReactRouterDomRoute,
  Redirect,
  useHistory,
} from 'react-router-dom'
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
import googleTagManagerHandler from 'GoogleTagManager'
import useAuth from './auth'

const DefaultRoute = ({
  component: Component,
  data,
  hook,
  pageTitle,
  ...rest
}) => {
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
          pageTitle={pageTitle}
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
  pageTitle: PropTypes.string.isRequired,
}

DefaultRoute.defaultProps = {
  data: [],
  hook: () => {},
}

const Route = ({ path, component, pageTitle, ...rest }) => {
  const history = useHistory()
  const auth = useSelector(state => state.auth)
  const points = useSelector(
    state => state.points.data && state.points.data.detalheExtratoOptemaisTypes
  )

  useEffect(() => {
    googleTagManagerHandler(history.location.pathname, pageTitle, auth, points)
  }, [history.location.pathname, pageTitle, auth, points])

  return (
    <ReactRouterDomRoute
      {...rest}
      path={path}
      exact={rest.exact}
      component={component}
      pageTitle={pageTitle}
    />
  )
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func,
  pageTitle: PropTypes.string.isRequired,
}

Route.defaultProps = {
  component: null,
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
      <DefaultRoute path="/" exact component={Home} pageTitle="Home" />

      <DefaultRoute
        path="/cartao-credito"
        exact
        component={CartaoCredito}
        data={creditCardData}
        hook={useFetchCreditCard}
        pageTitle="Home - Cartão de Crédito"
      />
      <DefaultRoute
        path="/seguro-viagem"
        exact
        component={TripInsurance}
        data={tripInsuranceData}
        hook={useFetchTripInsurance}
        pageTitle="Home - Seguro Viagem"
      />
      <DefaultRoute
        path="/financiamento-veiculo"
        exact
        component={VehicleFinancing}
        data={vehicleFinancingData}
        hook={useFetchVehicleFinancing}
        pageTitle="Home - Financiamento de Veículo"
      />
      <DefaultRoute
        path="/consorcio-imovel"
        exact
        component={ConsortiumBuilding}
        data={consortiumBuildingData}
        hook={useFetchConsortiumBuilding}
        pageTitle="Home - Consórcio de Imóvel"
      />
      <DefaultRoute
        path="/consorcio-veiculo"
        exact
        component={ConsortiumVehicle}
        data={consortiumVehicleData}
        hook={useFetchConsortiumVehicle}
        pageTitle="Home - Consórcio de Veículo"
      />
      <DefaultRoute
        path="/seguro-vida"
        exact
        component={SeguroVida}
        data={lifeInsuranceData}
        hook={useFetchLifeInsurance}
        pageTitle="Home - Seguro de Vida"
      />
      <DefaultRoute
        path="/investimentos"
        exact
        component={Investimentos}
        data={positionData}
        hook={useFetchPosition}
        pageTitle="Home - Investimentos"
      />
      <DefaultRoute
        path="/cartao-credito/visualizar"
        exact
        component={ManagementCreditCard}
        pageTitle="Gestão - Cartão de Crédito"
      />
      <DefaultRoute
        path="/seguro-viagem/visualizar"
        component={ManagementTripInsurance}
        pageTitle="Gestão - Seguro de Viagem"
      />
      <DefaultRoute
        path="/financiamento-veiculo/visualizar"
        exact
        component={ManagementVehicleFinancing}
        pageTitle="Gestão - Financiamento de Veículo"
      />
      <DefaultRoute
        path="/consorcio-imovel/visualizar"
        exact
        component={ManagementConsortiumBuilding}
        pageTitle="Gestão - Consórcio de Imóvel"
      />
      <DefaultRoute
        path="/consorcio-veiculo/visualizar"
        exact
        component={ManagementConsortiumVehicle}
        pageTitle="Gestão - Consórcio de Veículo"
      />
      <DefaultRoute
        path="/investimentos/visualizar"
        component={ManagementInvestimentos}
        pageTitle="Gestão - Investimentos"
      />
      <DefaultRoute
        path="/seguro-vida/visualizar"
        exact
        component={ManagementSeguroVida}
        pageTitle="Gestão - Seguro de Vida"
      />
      <Route
        path="/investimentos/extrato"
        exact
        component={InvestimentosExtrato}
        pageTitle="Investimentos - Extrato"
      />
      <DefaultRoute
        path="/investimentos/lista-fundos"
        component={InvestmentsFunds}
        pageTitle="Investimentos - Lista de Fundos"
      />
      <DefaultRoute
        path="/previdencia-privada"
        exact
        component={PrevidenciaPrivada}
        pageTitle="Home - Previdência Privada"
      />
      <DefaultRoute
        path="/pontos"
        exact
        component={Points}
        pageTitle="Home - Pontos"
      />
      <DefaultRoute
        path="/perfil"
        exact
        component={Profile}
        pageTitle="Home - Perfil"
      />
      <DefaultRoute
        path="/pontos/extrato"
        exact
        component={PointsStatement}
        pageTitle="Pontos - Extrato"
      />
      <DefaultRoute
        path="/objetivos/gerenciar"
        exact
        component={ObjectivesManager}
        pageTitle="Objetivos - Gerenciar"
      />
      <Route
        path="/objetivos"
        component={Objectives}
        pageTitle="Home - Objetivos"
      />
      <Route
        path="/perfil/cadastro"
        exact
        component={ProfileRegistration}
        pageTitle="Perfil - Cadastro"
      />
      <Route
        path="/perfil/investidor-perfil"
        exact
        component={ProfileSuitability}
        pageTitle="Perfil - Perfil Investidor"
      />
      <Route
        path="/redirect"
        exact
        component={RedirectComponent}
        pageTitle="Redirect"
      />
      <DefaultRoute
        path="/notificacoes"
        exact
        component={Notifications}
        pageTitle="Home - Notificações"
      />
    </Switch>
  )
}
