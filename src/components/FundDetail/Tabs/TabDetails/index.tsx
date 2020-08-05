import React from 'react'

import RiskProfileBar from './RiskProfileBar'
import Transactions from './Transactions'
import Taxation from './Taxation'

import { ContentWrapper, GrayLine } from './styles'
import { IFundDetails } from 'store/modules/Investment/Details/iDetails'

interface IProps {
  fund: IFundDetails
}
export const TabDetails = ({ fund }: IProps) => (
  <ContentWrapper>
    <RiskProfileBar riskProfile={fund.perfil_risco} />
    <GrayLine />
    <Transactions fund={fund} />
    <GrayLine />
    <Taxation fund={fund} />
  </ContentWrapper>
)

export default TabDetails
