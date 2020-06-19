import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import { formatMoney } from 'helpers'
import { IAnswer, IIncome } from 'store/modules/Objective/types'

import {
  BodyCard,
  CardRow,
  Divider,
  FeaturedText,
  FullHeightCard,
  GridRow,
  LabelIncome,
  LabelObjective,
} from './styles'

interface ICardProps {
  answer: IAnswer
  income: IIncome
}

enum incomeLabel {
  'pessimistic' = 'Pessimista',
  'median' = 'Mediano',
  'optimistic' = 'Otimista',
}

const CardEstimatedResults = ({ answer, income }: ICardProps) => {
  return (
    <GridRow>
      <Col lg={12}>
        <FullHeightCard
          headerIcon="linechart"
          headerTitle="Resultados estimados"
        >
          <BodyCard>
            <CardRow>
              <LabelObjective lg="auto" sm="auto" xs={6}>
                <Text type="captionUppercase" color="gray4">
                  Data Alvo
                </Text>
                <FeaturedText>{answer.target_date}</FeaturedText>
              </LabelObjective>
              <LabelObjective lg="auto" sm="auto" xs={6}>
                <Text type="captionUppercase" color="gray4">
                  Meta Financeira
                </Text>
                <FeaturedText>{formatMoney(answer.target_value)}</FeaturedText>
              </LabelObjective>
              <LabelObjective lg="auto" sm="auto" xs={6}>
                <Text type="captionUppercase" color="gray4">
                  Investimento Inicial
                </Text>
                <FeaturedText>{formatMoney(answer.initial_value)}</FeaturedText>
              </LabelObjective>
              <LabelObjective lg="auto" sm="auto" xs={6}>
                <Text type="captionUppercase" color="gray4">
                  Investimento Mensal
                </Text>
                <FeaturedText>{formatMoney(answer.monthly_value)}</FeaturedText>
              </LabelObjective>
              <Divider />
            </CardRow>
            <CardRow>
              <Col lg={12}>
                <Text type="headline">
                  Os valores representam uma estimativa do histórico de
                  rendimentos dos fundos sugeridos.
                </Text>
                <Text type="headline">
                  Dessa forma, seu dinheiro poderá evoluir até sua meta em três
                  cenários:
                </Text>
              </Col>
            </CardRow>
            <CardRow justifyContent="between">
              {Object.entries(income)
                .sort((a, b) => (a[1] < b[1] ? 1 : -1))
                .map(([key, value], index) => {
                  return (
                    <LabelIncome
                      smAuto
                      key={`${(incomeLabel as any)[key]}-${index}`}
                    >
                      <Text type="captionUppercase" color="gray5">
                        Cenário {(incomeLabel as any)[key]}
                      </Text>
                      <Text type="heading4" bold>
                        {formatMoney(value)}
                      </Text>
                    </LabelIncome>
                  )
                })}
            </CardRow>
          </BodyCard>
        </FullHeightCard>
      </Col>
    </GridRow>
  )
}

export default CardEstimatedResults
