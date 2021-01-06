import React from 'react'
import * as s from './styles'

import MainCoverages from './MainCoverages'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

interface IPlanCardProps {
  planName: string
  recommendedPaymentPlan: string
  upfrontPayment: string
  firstCoverageAmount?: string
  secondCoverageAmount?: string
  thridCoverageAmount?: string
  isLoading: boolean
  onHireClick: () => void
}

const PlanCard = ({
  planName,
  recommendedPaymentPlan,
  upfrontPayment,
  firstCoverageAmount,
  secondCoverageAmount,
  thridCoverageAmount,
  isLoading,
  onHireClick = () => {},
}: IPlanCardProps) => {
  const isMobile = useMedia('sm')
  const isMdUp = useMedia('mdUp')
  const isLg = useMedia('lg')

  return (
    <s.CardComponent>
      <s.InfoWrapper>
        <s.PlanNameWrapper>
          <s.PlanName type="heading4" bold>
            {planName}
          </s.PlanName>
        </s.PlanNameWrapper>
        <s.Installments type="captionUppercase" color="gray5">
          {recommendedPaymentPlan}
        </s.Installments>
        <Text type="heading4" bold>
          {upfrontPayment}
        </Text>
      </s.InfoWrapper>
      <s.ContractButton
        color="secondary"
        loading={isLoading}
        loadingColor="green3"
        onClick={onHireClick}
      >
        Contratar
      </s.ContractButton>
      <s.Divider />
      <s.MainCoveragesTitle
        type="subheading"
        bold
        textAlign="center"
        color="gray5"
      >
        PRINCIPAIS COBERTURAS
      </s.MainCoveragesTitle>
      <MainCoverages
        isMobile={isMobile}
        isMdUp={isMdUp}
        isLg={isLg}
        firstCoverageAmount={firstCoverageAmount}
        secondCoverageAmount={secondCoverageAmount}
        thridCoverageAmount={thridCoverageAmount}
      />
    </s.CardComponent>
  )
}

export default PlanCard
