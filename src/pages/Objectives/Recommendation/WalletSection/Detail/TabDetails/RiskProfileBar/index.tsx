import React, { useState, useEffect } from 'react'

import HorizontalList from 'components/HorizontalList'
import { StyledIcon } from 'pages/Investments/FundsList/styles'
import Text from 'components/Text'
import {
  Bar,
  RiskClassification,
  RiskColor,
  RiskProfileWrapper,
  RiskText,
} from './styles'

interface IRiskProfile {
  riskProfile: string
}

const RiskProfileBar = ({ riskProfile }: IRiskProfile) => {
  const [risks, setRisk] = useState({
    baixo: false,
    'medio-baixo': false,
    medio: false,
    'medio-alto': false,
    alto: false,
  })

  useEffect(() => {
    setRisk(currentRisks => ({ ...currentRisks, [riskProfile]: true }))
  }, [riskProfile])

  return (
    <RiskProfileWrapper>
      <HorizontalList
        noPadding
        startItems={[
          <StyledIcon name="flag" />,
          <Text color="gray6" type="subheading" bold>
            PERFIL DE RISCO
          </Text>,
        ]}
      />
      <RiskClassification>
        <Bar riskColor="lowRisk" selected={risks.baixo}>
          <RiskColor />
          <RiskText>Risco baixo</RiskText>
        </Bar>
        <Bar riskColor="lowMediumRisk" selected={risks['medio-baixo']}>
          <RiskColor />
          <RiskText>Risco médio-baixo</RiskText>
        </Bar>
        <Bar riskColor="mediumRisk" selected={risks.medio}>
          <RiskColor />
          <RiskText>Risco médio</RiskText>
        </Bar>
        <Bar riskColor="mediumHighRisk" selected={risks['medio-alto']}>
          <RiskColor />
          <RiskText>Risco médio-alto</RiskText>
        </Bar>
        <Bar riskColor="highRisk" selected={risks.alto}>
          <RiskColor />
          <RiskText>Risco alto</RiskText>
        </Bar>
      </RiskClassification>
    </RiskProfileWrapper>
  )
}

export default RiskProfileBar
