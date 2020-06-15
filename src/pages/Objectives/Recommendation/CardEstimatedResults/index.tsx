import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import { formatMoney } from 'helpers'
import { incomeLabel } from './dataCardEstimated'
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

interface IAnswer {
  nickname?: string
  target_date: string
  target_value: number
  initial_value: number
  monthly_value: number
  would_like_to_receive_monthly_income?: boolean
  goal_type?: string
  is_easy_to_save_planned_amount?: boolean
  is_target_date_flexible?: boolean
  profile?: number
}

interface IMonthsIncome {
  month: string
  value: number
}

interface IIncome {
  pessimistic: IMonthsIncome[]
  median: IMonthsIncome[]
  optimistic: IMonthsIncome[]
}

interface ICardProps {
  answer: IAnswer
  income: IIncome
}

const CardEstimatedResults = ({ answer, income }: ICardProps) => {
  const positionIncome = Object.values(income)
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
              {positionIncome.map((item: any, key) => (
                <LabelIncome smAuto key={`${incomeLabel[key]}-${key}`}>
                  <Text type="captionUppercase" color="gray5">
                    Cenário {incomeLabel[key]}
                  </Text>
                  <Text type="heading4" bold>
                    {formatMoney(item[item.length - 1].value)}
                  </Text>
                </LabelIncome>
              ))}
            </CardRow>
          </BodyCard>
        </FullHeightCard>
      </Col>
    </GridRow>
  )
}

export default CardEstimatedResults
