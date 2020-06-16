import React from 'react'

import * as s from './styles'

type TSuggestion = {
  suggestion_monthly_value: number
  suggestion_target_date: string
}

interface ISuggestionProps {
  suggestion_goal: TSuggestion | undefined
}

const RecommendationMessage = ({
  suggestion_goal,
  ...rest
}: ISuggestionProps) => {
  const hasSuggestionGoal = !!suggestion_goal

  return (
    <s.GridRow {...rest}>
      <s.GridCol>
        <s.RecommendationText hasSuggestionGoal={hasSuggestionGoal}>
          {hasSuggestionGoal ? (
            <>
              <s.Message>Os valores e o prazo não alcançam a meta</s.Message>
              <s.Message>&nbsp;financeira que você quer atingir.</s.Message>
            </>
          ) : (
            <>
              <s.Message>Ótimo!</s.Message>
              <s.Message>
                &nbsp;Já temos uma carteira de investimento para você.
              </s.Message>
            </>
          )}
        </s.RecommendationText>
      </s.GridCol>
    </s.GridRow>
  )
}

export default RecommendationMessage
