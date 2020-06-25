import React from 'react'

import { IFunds } from 'store/modules/Objective/types'

import RiskProfileBar from './RiskProfileBar'
import Transactions from './Transactions'
import Taxation from './Taxation'
import { ContentWrapper, GrayLine } from './styles'

interface IFund {
  fund: IFunds
}

export const TabDetails = ({ fund }: IFund) => (
  <ContentWrapper>
    <RiskProfileBar
      data-testid="risk-profile-bar"
      riskProfile={fund.profile_risk}
    />
    <GrayLine />
    <Transactions data-testid="transactions" fund={fund} />
    <GrayLine />
    <Taxation data-testid="taxation" fund={fund} />
  </ContentWrapper>
)

export default TabDetails
