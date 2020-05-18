import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import { GridRow } from './styles'

type TSuggestion = {
  suggestion_monthly_value: number
  suggestion_target_date: string
}

interface ISuggestionProps {
  suggestion_goal: TSuggestion
}

const RecommendationMessage = ({ suggestion_goal }:ISuggestionProps) => (
  <GridRow justifyContent="center">
    <Col lgAuto smAuto xs={12}>
      <Text type="heading4" color="gray6" textAlign="center">
        {suggestion_goal
          ? 'Veja abaixo o cenário sem alterar os dados preenchidos.'
          : 'Ótimo! Já temos um plano para você.'}
      </Text>
    </Col>
  </GridRow>
)

export default RecommendationMessage