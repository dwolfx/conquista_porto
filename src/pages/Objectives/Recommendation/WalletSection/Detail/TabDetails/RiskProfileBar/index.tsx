import React, { useState, useEffect } from 'react'

import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Icon from 'components/IconExporter'

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

const RiskProfileBar = ({ riskProfile, ...rest }: IRiskProfile) => {
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
    <RiskProfileWrapper {...rest}>
      <HorizontalList
        noPadding
        startItems={[
          <Icon name="flag" width={21} />,
          <Text color="gray6" type="subheading" bold>
            PERFIL DE RISCO
          </Text>,
        ]}
      />
      <RiskClassification>
        <Bar riskColor="lowRisk" selected={risks.baixo}>
          <RiskColor />
          <RiskText data-testid="low-risk">Risco baixo</RiskText>
        </Bar>
        <Bar riskColor="lowMediumRisk" selected={risks['medio-baixo']}>
          <RiskColor data-testid="low-medium-risk" />
          <RiskText>Risco médio-baixo</RiskText>
        </Bar>
        <Bar riskColor="mediumRisk" selected={risks.medio}>
          <RiskColor data-testid="medium-risk" />
          <RiskText>Risco médio</RiskText>
        </Bar>
        <Bar riskColor="mediumHighRisk" selected={risks['medio-alto']}>
          <RiskColor data-testid="medium-high-risk" />
          <RiskText>Risco médio-alto</RiskText>
        </Bar>
        <Bar riskColor="highRisk" selected={risks.alto}>
          <RiskColor />
          <RiskText data-testid="high-risk">Risco alto</RiskText>
        </Bar>
      </RiskClassification>
    </RiskProfileWrapper>
  )
}

export default RiskProfileBar
