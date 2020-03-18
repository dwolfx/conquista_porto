import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Divisor from 'components/Divisor'

import { GetVehicleFinancingDataRequest } from 'store/modules/VehicleFinancing/action'
import { GetConsortiumVehicleDataRequest } from 'store/modules/ConsortiumVehicle/action'
import { GetConsortiumBuildingDataRequest } from 'store/modules/ConsortiumBuilding/action'
import { GetLifeInsuranceDataRequest } from 'store/modules/LifeInsurance/action'
import { GetTripInsuranceDataRequest } from 'store/modules/TripInsurance/action'
import { GetCreditCardDataRequest } from 'store/modules/CreditCard/action'

import InvestmentSection from './InvestmentSection'
import ProductItemGenerator from './ProductItemGenerator'

import CardHeaderState from './commons/CardHeaderState'
import {
  FullHeightCard,
  SectionCol,
  SectionRow,
  OverflowCard,
  ProductsCol,
} from './styles'

const SectionOne = ({ onFetchInvestments }) => {
  const {
    auth,
    vehiclesFinancings,
    creditCards,
    vehiclesConsortium,
    buildingConsortium,
    investments,
  } = useSelector(state => ({
    auth: state.auth,
    vehiclesFinancings: state.vehicleFinancing,
    creditCards: state.creditCard,
    vehiclesConsortium: state.consortiumVehicle,
    buildingConsortium: state.consortiumBuilding,
    isLoadingInvestments: state.consolidatedPosition,
    hasErrorInvestments: state.consolidatedPosition,
    investments: state.consolidatedPosition,
  }))

  const history = useHistory()
  const dispatch = useDispatch()

  const renderCreditProducts = () => {
    let result = []

    result = [
      ...ProductItemGenerator(creditCards, 'cartaoCredito', history, () =>
        dispatch(GetCreditCardDataRequest(auth.cpf))
      ),
      ...ProductItemGenerator(
        vehiclesFinancings,
        'financiamentoVeiculo',
        history,
        () => dispatch(GetVehicleFinancingDataRequest(auth.cpf))
      ),
      ...ProductItemGenerator(
        vehiclesConsortium,
        'consorcioVeiculo',
        history,
        () => dispatch(GetConsortiumVehicleDataRequest(auth.cpf))
      ),
      ...ProductItemGenerator(
        buildingConsortium,
        'consorcioImovel',
        history,
        () => dispatch(GetConsortiumBuildingDataRequest(auth.cpf))
      ),
    ]

    return formatResult(insertDivisor, sortArray)(result)
  }

  return (
    <>
      <SectionCol md="5">
        <FullHeightCard
          headerIcon="financial"
          headerTitle="Investimentos"
          headerEndItem={
            <CardHeaderState
              data={investments.data}
              isLoading={investments.isLoading}
              hasError={investments.hasError}
              onErrorClick={() => onFetchInvestments}
            />
          }
        >
          <InvestmentSection onFetchInvestments={onFetchInvestments} />
        </FullHeightCard>
      </SectionCol>

      <SectionCol md="7">
        <SectionRow>
          <ProductsCol md="6">
            <FullHeightCard headerIcon="creditcard" headerTitle="Crédito">
              <OverflowCard>{renderCreditProducts()}</OverflowCard>
            </FullHeightCard>
          </ProductsCol>

          <ProductsCol md="6">
            <FullHeightCard headerIcon="targetmarket" headerTitle="Seguros">
              <OverflowCard>
                <InsuranceCard />
              </OverflowCard>
            </FullHeightCard>
          </ProductsCol>
        </SectionRow>
      </SectionCol>
    </>
  )
}

const InsuranceCard = () => {
  const { auth, lifeInsurance, tripInsurance } = useSelector(state => ({
    auth: state.auth,
    lifeInsurance: state.lifeInsurance,
    tripInsurance: state.tripInsurance,
  }))

  const history = useHistory()
  const dispatch = useDispatch()

  let result = []

  result = [
    ...ProductItemGenerator(lifeInsurance, 'seguroVida', history, () =>
      dispatch(GetLifeInsuranceDataRequest(auth.cpf))
    ),
    ...ProductItemGenerator(tripInsurance, 'seguroViagem', history, () =>
      dispatch(GetTripInsuranceDataRequest(auth.cpf))
    ),
  ]

  return formatResult(insertDivisor, sortArray)(result)
}

const formatResult = (func1, func2) => array => func1(func2(array))

const insertDivisor = array =>
  array
    .map((x, i) =>
      i < array.length - 1
        ? [x, <Divisor key={`divisor-${Math.random()}`} />]
        : x
    )
    .flatMap(x => x)

const sortArray = array =>
  array.sort((a, b) => {
    if (b.key.includes('empty')) {
      return -1
    }

    return 0
  })

SectionOne.propTypes = {
  onFetchInvestments: PropTypes.func.isRequired,
}

export default SectionOne
