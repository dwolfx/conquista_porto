import React, { useState } from 'react'
import * as s from './styles'

import MainCoverages from './MainCoverages'
import RatingStars from './RatingStars'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

interface IPlanCardProps {
  planName: string
  rating: string
  installmentsAmount: string
  upfrontAmount: string
  firstCoverageAmount: string
  secondCoverageAmount: string
  thridCoverageAmount: string
  isLoading: boolean
}

const PlanCard = ({
  planName = 'Brasil Terra',
  rating = '3',
  installmentsAmount = '3x sem juros de R$ 209,97',
  upfrontAmount = 'R$ 659,82 à vista',
  firstCoverageAmount = 'R$ 150.000,00',
  secondCoverageAmount = 'R$ 250.000,00',
  thridCoverageAmount = 'R$ 350.000,00',
  isLoading = true,
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
          <RatingStars rating={rating} />
        </s.PlanNameWrapper>
        <s.Installments type="captionUppercase" color="gray5">
          {installmentsAmount}
        </s.Installments>
        <Text type="heading4" bold>
          {upfrontAmount}
        </Text>
      </s.InfoWrapper>
      <s.ContractButton
        color="secondary"
        loading={isLoading}
        loadingColor="green3"
      >
        Contratar
      </s.ContractButton>
      <s.Divider />
      <s.MainCoveragesTitle
        type="subheading"
        bold
        textTransform="uppercase"
        textAlign="center"
        color="gray5"
      >
        Principais coberturas
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
