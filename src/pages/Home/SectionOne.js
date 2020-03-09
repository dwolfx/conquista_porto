import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Divisor from 'components/Divisor'

import InvestmentSection from './InvestmentSection'

import ProductItemGenerator from './ProductItemGenerator'

import {
  FullHeightCard,
  SectionCol,
  SectionRow,
  OverflowCard,
  ProductsCol,
} from './styles'

const SectionOne = ({ onFetchInvestments }) => {
  const vehiclesFinancings = useSelector(state => state.vehicleFinancing.data)
  const creditCards = useSelector(state => state.creditCard.data)
  const vehiclesConsortium = useSelector(state => state.consortiumVehicle.data)
  const buildingConsortium = useSelector(state => state.consortiumBuilding.data)

  const history = useHistory()

  const renderCreditProducts = () => {
    let result = []

    result = [
      ...ProductItemGenerator(creditCards, 'cartaoCredito', history),
      ...ProductItemGenerator(
        vehiclesFinancings,
        'financiamentoVeiculo',
        history
      ),
      ...ProductItemGenerator(vehiclesConsortium, 'consorcioVeiculo', history),
      ...ProductItemGenerator(buildingConsortium, 'consorcioImovel', history),
    ]

    return formatResult(insertDivisor, sortArray)(result)
  }

  return (
    <>
      <SectionCol md="5">
        <FullHeightCard headerIcon="financial" headerTitle="Investimentos">
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
  const lifeInsurance = useSelector(state => state.lifeInsurance.data)
  const tripInsurance = useSelector(state => state.tripInsurance.data)

  const history = useHistory()

  let result = []

  result = [
    ...ProductItemGenerator(lifeInsurance, 'seguroVida', history),
    ...ProductItemGenerator(tripInsurance, 'seguroViagem', history),
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
