import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'
import { useSelector } from 'react-redux'

import Credits from './Credits'
import InsuranceCard from './InsuranceCard'
import InvestmentCard from './InvestmentCard'

import CardHeaderState from './commons/CardHeaderState'
import PrivateWelfareEmptyState from './PrivateWelfare/PrivateWelfareEmptyState'
import { GridCol, GridColFlexContainer, HomePrivateWelfareCard } from './styles'
// import PrivateWalfareSection from './PrivateWelfare'

const SectionOne = ({ onFetchInvestments }) => {
  const { investments } = useSelector(state => ({
    investments: state.consolidatedPosition,
  }))

  const cardHeaderState = (
    <CardHeaderState
      showHeader={Boolean(
        investments.data && Object.entries(investments.data).length
      )}
      isLoading={investments.isLoading}
      hasError={investments.hasError}
      onErrorClick={() => onFetchInvestments()}
    />
  )

  return (
    <>
      <GridCol md="6" mdOffset="0" sm="12" smOffset="0" lg="4" lgOffset="1">
        <InvestmentCard
          onFetchInvestments={onFetchInvestments}
          headerEndItem={cardHeaderState}
        />
      </GridCol>
      <GridCol lg="4" md="6" sm="12">
        {/* <PrivateWalfareSection headerEndItem={cardHeaderState} /> */}
        <HomePrivateWelfareCard
          headerIcon="time"
          headerTitle="Previdência"
          headerEndItem={cardHeaderState}
        >
          <PrivateWelfareEmptyState />
        </HomePrivateWelfareCard>
      </GridCol>
      <GridColFlexContainer lg="3" md="12" mdOffset="0" sm="12" xs="12">
        <InsuranceCard headerEndItem={cardHeaderState} />
        <Credits>{cardHeaderState}</Credits>
      </GridColFlexContainer>
    </>
  )
}

SectionOne.propTypes = {
  onFetchInvestments: PropTypes.func.isRequired,
}

export default SectionOne
