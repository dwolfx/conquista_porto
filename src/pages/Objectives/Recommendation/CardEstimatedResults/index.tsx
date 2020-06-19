import React from 'react'

import { Col } from 'styled-bootstrap-grid'
import Card from 'components/Card'
import Popover from 'components/Popover/index'

import { formatMoney } from 'helpers'
import * as s from './styles'

interface IIncome {
  pessimistic: number
  median: number
  optimistic: number
}

interface ICardProps {
  answerTargetValue: number
  income: IIncome
}

const CardEstimatedResults = ({
  answerTargetValue,
  income,
  ...rest
}: ICardProps) => {
  const popoverContent = (
    <s.PopOverTextContainer>
      <s.PopOverText>
        Carteira é o nome dado ao conjunto de fundos que você investe.
      </s.PopOverText>
      <s.PopOverText>Ela pode ter uma ou mais categorias.</s.PopOverText>
    </s.PopOverTextContainer>
  )

  return (
    <s.GridRow {...rest}>
      <Col lg={12}>
        <Card headerIcon="linechart" headerTitle="Resultados estimados">
          <s.BodyCard>
            <s.TextContainer data-testid="text-container">
              <s.Text>
                Estas são as estimativas de quando o seu investimento pode
                evoluir, baseadas no histórico de rendimentos dos fundos
                da&nbsp;
              </s.Text>

              <Popover content={() => popoverContent}>
                <s.DashedText>carteira recomendada</s.DashedText>
              </Popover>
              <Popover content={() => popoverContent}>
                <s.InformativeIcon />
              </Popover>
              <s.Text>&nbsp;.</s.Text>
            </s.TextContainer>
            <s.IncomeContainer>
              <s.VerticalList
                elements={[
                  <s.EstimateTitle data-testid="estimate-title-1">
                    Estimativa Pessimista
                  </s.EstimateTitle>,
                  <s.EstimateValue data-testid="estimate-value-1">
                    {formatMoney(income.pessimistic)}
                  </s.EstimateValue>,
                ]}
              />
              <s.VerticalList
                elements={[
                  <s.EstimateTitle data-testid="estimate-title-2">
                    Estimativa Provável
                  </s.EstimateTitle>,
                  <s.EstimateValue
                    data-testid="estimate-value-2"
                    probableEstimateLabel
                    isBelowTheGoal={income.median < answerTargetValue}
                  >
                    {formatMoney(income.median)}
                  </s.EstimateValue>,
                ]}
              />
              <s.VerticalList
                elements={[
                  <s.EstimateTitle data-testid="estimate-title-3">
                    Estimativa Otimista
                  </s.EstimateTitle>,
                  <s.EstimateValue data-testid="estimate-value-3">
                    {formatMoney(income.optimistic)}
                  </s.EstimateValue>,
                ]}
              />
            </s.IncomeContainer>
          </s.BodyCard>
        </Card>
      </Col>
    </s.GridRow>
  )
}

export default CardEstimatedResults
