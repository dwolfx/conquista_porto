import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  Bar,
  FlagIcon,
  GrayLine,
  RiskClassification,
  RiskColor,
  RiskProfileWrapper,
  RiskText,
  Title,
  TitleWrapper,
} from './styles'

const RiskProfileBar = ({ riskProfile }) => {
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
    <>
      <RiskProfileWrapper>
        <TitleWrapper>
          <FlagIcon />
          <Title>Perfil de Risco</Title>
        </TitleWrapper>
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
      <GrayLine />
    </>
  )
}

export default RiskProfileBar

RiskProfileBar.propTypes = {
  riskProfile: PropTypes.string,
}

RiskProfileBar.defaultProps = {
  riskProfile: '',
}
