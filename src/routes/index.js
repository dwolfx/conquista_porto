import React from 'react'
import { Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'styled-components/macro'

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
import CreditCardStepPRO from 'pages/CreditCard/PRO/Creation/PartnerOffer/Steps/CreditCardStep'
import SummaryProposalPRO from 'pages/CreditCard/PRO/Creation/CustomerProposalOffer/Steps/SummaryProposal'
import ManagementCreditCard from 'pages/CreditCard/Management'
import SeguroVida from 'pages/LifeInsurance'
import ManagementSeguroVida from 'pages/LifeInsurance/Management'
import ManagementTripInsurance from 'pages/TripInsurance/Management'
import RedirectComponent from 'pages/Redirect'
import Withdraw from 'pages/Withdraw'
import TripInsurenceCreation from 'pages/TripInsurance/Creation'
import TripInsurenceParnerPRO from 'pages/TripInsurance/PRO/Creation/PartnerOffer'
import TripInsurenceCustomerPRO from 'pages/TripInsurance/PRO/Creation/CustomerProposalOffer'

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
import useAuth from './useAuth'

import Route from './Route'
import DefaultRoute from './DefaultRoutes'

export default function Routes({ ...props }) {
  const isAuth = useAuth()
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

  const getDevRoutes = () => {
    // Rotas declaradas exclusivamente para teste em development ou local
    const isDevelopment = process.env.REACT_APP_ENV === 'development'
    const isLocal = process.env.REACT_APP_ENV === 'local'
    if (isDevelopment || isLocal) {
      return (
        <>
          <Route
            path="/seguro-viagem/simular"
            exact
            component={TripInsurenceCreation}
            pageTitle="Seguro Viagem - Simular"
          />
          <Route
            path="/cartao-credito/pro/:hash"
            component={CreditCardStepPRO}
            pageTitle="Home - Cartão de Crédito - PRO"
          />
          <Route
            path="/seguro-viagem/pro/:hash"
            exact
            component={TripInsurenceParnerPRO}
            pageTitle="Seguro Viagem - Simular"
          />
          <Route
            path="/seguro-viagem/proposta/:redisKey"
            exact
            component={TripInsurenceCustomerPRO}
            pageTitle="Seguro Viagem - Simular"
          />
          <Route
            path="/cartao-credito/proposta/:redisKey"
            exact
            component={SummaryProposalPRO}
            pageTitle="Proposta - Cartão de Crédito"
          />
        </>
      )
    }
    return null
  }

  const validateDigitalSign = () => {
    if (digitalSignIsValid()) {
      return (
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
          {getDevRoutes()}
        </Switch>
      )
    }
    return redirectCustomerProfile()
  }

  return !isAuth ? <Login /> : validateDigitalSign()
}
