import React from 'react'

import { ICreditProduct } from 'store/modules/Objective/types'

import * as s from './styles'

type TSuggestion = {
  suggestion_monthly_value: number
  suggestion_target_date: string
}

interface ISuggestionProps {
  suggestion_goal?: TSuggestion
  incomeMedianValue: number
  answerTargetValue: number
  creditProduct?: ICreditProduct
}

const RecommendationMessage = ({
  suggestion_goal,
  incomeMedianValue,
  answerTargetValue,
  creditProduct,
  ...rest
}: ISuggestionProps) => {
  const hasSuggestionGoal = !!suggestion_goal

  return (
    <s.GridRow {...rest}>
      <s.GridCol>
        {hasSuggestionGoal &&
          answerTargetValue > incomeMedianValue &&
          !creditProduct && (
            <s.RecommendationText firstCaseText>
              <>
                <s.Message>Os valores e o prazo não alcançam a meta</s.Message>
                <s.Message>&nbsp;financeira que você quer atingir.</s.Message>
              </>
            </s.RecommendationText>
          )}
        {(incomeMedianValue >= answerTargetValue ||
          (hasSuggestionGoal &&
            answerTargetValue > incomeMedianValue &&
            creditProduct)) && (
          <s.RecommendationText>
            <>
              <s.Message>Ótimo!</s.Message>
              <s.Message>
                &nbsp;Já temos uma carteira de investimento para você.
              </s.Message>
            </>
          </s.RecommendationText>
        )}
      </s.GridCol>
    </s.GridRow>
  )
}

export default RecommendationMessage
