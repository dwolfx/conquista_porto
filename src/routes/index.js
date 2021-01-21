import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Switch,
  Route as ReactRouterDomRoute,
  Redirect,
  useHistory,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'styled-components/macro'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Loading from 'components/Loading'

import Home from 'pages/Home'
import Investimentos from 'pages/Investments'
import InvestmentsFunds from 'pages/Investments/FundsList'
import ManagementInvestimentos from 'pages/Investments/Management'
// import PrevidenciaPrivada from 'pages/PrivateWelfare'
import VehicleFinancing from 'pages/VehicleFinancing'
import ManagementVehicleFinancing from 'pages/VehicleFinancing/Management'
import TripInsurance from 'pages/TripInsurance'
import ConsortiumVehicle from 'pages/ConsortiumVehicle'
import ManagementConsortiumVehicle from 'pages/ConsortiumVehicle/Management'
import ConsortiumBuilding from 'pages/ConsortiumBuilding'
import ManagementConsortiumBuilding from 'pages/ConsortiumBuilding/Management'
import CartaoCredito from 'pages/CreditCard'
import CartaoCreditoPro from 'pages/CreditCard/PRO'
import ManagementCreditCard from 'pages/CreditCard/Management'
import SeguroVida from 'pages/LifeInsurance'
import ManagementSeguroVida from 'pages/LifeInsurance/Management'
import ManagementTripInsurance from 'pages/TripInsurance/Management'
import RedirectComponent from 'pages/Redirect'
import Withdraw from 'pages/Withdraw'
import SummaryProposal from 'pages/CreditCard/PRO/SummaryProposal'
import TripInsuranceProposalPROCreation from 'pages/TripInsurance/PRO/Creation'
import TripInsuranceProposalCreation from 'pages/TripInsurance/Creation'

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
import googleTagManagerHandler from 'GoogleTagManager'
import useAuth from './useAuth'

import { LoadingContainer } from './styles'

const DefaultRoute = ({
  component: Component,
  computedMatch: match,
  data,
  hook,
  name,
  pageTitle,
  ...rest
}) => {
  let dataLength = 0

  try {
    if (!data) {
      hook()

      // while the hook is being called, dont render anything (eliminates blink between screens)
      return (
        <LoadingContainer>
          <Loading type="bar" />
        </LoadingContainer>
      )
    }

    dataLength = Array.isArray(data) ? data.length : Object.entries(data).length
  } catch (error) {
    dataLength = 0
  }

  const crumbs = match.path
    .split('/')
    .slice(1)
    .map(item => {
      if (Object.keys(match.params).includes(item.replace(':', ''))) {
        return name || pageTitle
      }
      if (item === 'lista-fundos') {
        return 'lista de fundos'
      }
      return item
    })

  return (
    <>
      <Header crumbs={crumbs} />
      <main className="main-content">
        <Route
          {...rest}
          computedMatch={match}
          pageTitle={pageTitle}
          isFinalComponent={Boolean(!dataLength)}
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
  computedMatch: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.object,
  }),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  hook: PropTypes.func,
  name: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
}

DefaultRoute.defaultProps = {
  computedMatch: {},
  data: [],
  hook: () => {},
  name: '',
}

const Route = ({ path, component, pageTitle, isFinalComponent, ...rest }) => {
  const history = useHistory()
  const auth = useSelector(state => state.auth)
  const points = useSelector(
    state => state.points.data && state.points.data.detalheExtratoOptemaisTypes
  )

  useEffect(() => {
    const pathName = history.location.pathname
    const splitName = pathName.split('/')
    let title = pageTitle

    if (pathName.includes('objetivos') && splitName.length > 2) {
      title = `${pageTitle} - ${splitName.slice(-1)}`
    }

    if (isFinalComponent) {
      googleTagManagerHandler(history.location.pathname, title, auth, points)
    }
  }, [history.location.pathname, pageTitle, auth, points, isFinalComponent])

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
  isFinalComponent: PropTypes.bool,
}

Route.defaultProps = {
  component: null,
  isFinalComponent: true,
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
    objectiveManagement,
    digitalSign,
  } = useSelector(state => ({
    creditCardData: state.creditCard.data,
    tripInsuranceData: state.tripInsurance.data,
    vehicleFinancingData: state.vehicleFinancing.data,
    consortiumBuildingData: state.consortiumBuilding.data,
    consortiumVehicleData: state.consortiumVehicle.data,
    lifeInsuranceData: state.lifeInsurance.data,
    positionData: state.investmentPosition.data,
    objectiveManagement: state.objectiveManagement.data,
    digitalSign: state.auth.digitalSign,
  }))
  const isAuth = useAuth()

  const digitalSignIsValid = () => {
    if (process.env.REACT_APP_ENV === 'production') {
      return digitalSign && Object.keys(digitalSign).length > 0
    }
    return true
  }

  const redirectCustomerProfile = () => {
    window.open(
      'https://cliente.portoseguro.com.br/portaldecliente/conquista/termo-aceite',
      '_self'
    )
    return <Login />
  }

  const validateDigitalSign = () =>
    digitalSignIsValid() ? (
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
          path="/cartao-credito/pro/:hash"
          component={CartaoCreditoPro}
          pageTitle="Home - Cartão de Crédito - PRO"
        />

        {/* Disponibiliza as rotas dos fluxos de seguro viagem
        apenas nos nossos ambientes de desenvolvimento */}
        {process.env.REACT_APP_ENV === 'development' ||
        process.env.REACT_APP_ENV === 'local' ? (
          <Route
            path="/seguro-viagem/simular/pro"
            exact
            component={TripInsuranceProposalPROCreation}
            pageTitle="Seguro Viagem - Simular"
          />
        ) : null}
        {process.env.REACT_APP_ENV === 'development' ||
        process.env.REACT_APP_ENV === 'local' ? (
          <Route
            path="/seguro-viagem/simular"
            exact
            component={TripInsuranceProposalCreation}
            pageTitle="Seguro Viagem - Simular"
          />
        ) : null}

        <DefaultRoute
          path="/seguro-viagem"
          exact
          component={TripInsurance}
          data={tripInsuranceData}
          hook={useFetchTripInsurance}
          pageTitle="Home - Seguro Viagem"
        />
        <DefaultRoute
          path="/seguro-viagem/visualizar"
          component={ManagementTripInsurance}
          pageTitle="Gestão - Seguro de Viagem"
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
        <Route
          path="/cartao-credito/proposta/:tokenRedis"
          exact
          component={SummaryProposal}
          pageTitle="Proposta - Cartão de Crédito"
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
        <DefaultRoute
          path="/investimentos/lista-fundos"
          component={InvestmentsFunds}
          pageTitle="Investimentos - Lista de Fundos"
        />
        <DefaultRoute
          path="/objetivos/gerenciar/:objectiveId"
          exact
          component={ObjectivesManager}
          pageTitle="Objetivos - Gerenciar"
          name={objectiveManagement ? `#${objectiveManagement.nickname}` : ''}
        />
        <DefaultRoute
          path="/objetivos/gerenciar"
          exact
          component={ObjectivesManager}
          pageTitle="Objetivos - Gerenciar"
        />
        <Route
          path="/conta/retirar"
          exact
          component={Withdraw}
          pageTitle="Retirar"
        />
        <Route
          path="/objetivos"
          component={Objectives}
          pageTitle="Home - Objetivos"
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
    ) : (
      redirectCustomerProfile()
    )

  return !isAuth ? <Login /> : validateDigitalSign()
}
