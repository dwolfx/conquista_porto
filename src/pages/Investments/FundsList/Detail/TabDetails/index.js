import React from 'react'
import PropTypes from 'prop-types'

import RiskProfileBar from './RiskProfileBar'
import Transactions from './Transactions'
import Taxation from './Taxation'

import { ContentWrapper } from './styles'
import { GrayLine } from './RiskProfileBar/styles'

export const TabDetails = ({ fund, category }) => (
  <ContentWrapper>
    <RiskProfileBar riskProfile={fund.perfil_risco} />
    <GrayLine />
    <Transactions fund={fund} category={category} />
    <GrayLine />
    <Taxation fund={fund} />
  </ContentWrapper>
)

export default TabDetails

TabDetails.propTypes = {
  fund: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
}
