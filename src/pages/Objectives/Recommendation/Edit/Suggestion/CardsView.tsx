import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import { uuid } from 'uuidv4'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Text from 'components/Text'
import VerticalList from 'components/VerticalList'

import { formatMoney } from 'helpers'

import AnswerForm from 'pages/Objectives/Recommendation/Edit/commons/AnswerForm'

import { answerLabels, IView } from './types'
import * as s from './styles'

export default function CardsView({
  editValues,
  setEditValues,
  answer,
  suggestionData,
  buttons,
  setError,
}: IView) {
  const renderVerticalList = (
    // data: Omit<IAnswer, 'uf' | 'goal_type' | 'profile'>,
    data: { [key: string]: string },
    type: 'monthly_value' | 'target_date'
  ) =>
    Object.entries(data).map(([key, value], index) => (
      <React.Fragment key={uuid()}>
        {index !== 0 && <s.Divisor />}
        <VerticalList
          elements={[
            <Text type="captionUppercase" color="gray4" bold>
              {(answerLabels as any)[key]}
            </Text>,
            <s.ValueText
              type="headline"
              color={type === key ? 'green4' : 'gray6'}
              bold
            >
              {value}
              {type === key && <Icon name="check" width={21} color="green4" />}
            </s.ValueText>,
          ]}
        />
      </React.Fragment>
    ))

  return (
    <Row>
      <Col lg={4} md={4}>
        <s.FullHeightCard
          headerTitle="Editar os dados preenchidos:"
          footer={buttons.recalculate}
        >
          <s.CardBody>
            <AnswerForm
              values={editValues}
              updateValues={setEditValues}
              setHasError={setError}
            />
          </s.CardBody>
        </s.FullHeightCard>
      </Col>

      <Col lg={4} md={4}>
        <s.FullHeightCard
          headerTitle="Considerar novo valor mensal:"
          footer={buttons.monthly_value}
        >
          <s.CardBody>
            {renderVerticalList(
              {
                nickname: answer.nickname,
                target_date: answer.target_date,
                target_value: formatMoney(answer.target_value),
                initial_value: formatMoney(answer.initial_value),
                monthly_value: formatMoney(
                  suggestionData.suggestion_monthly_value
                ),
              },
              'monthly_value'
            )}
          </s.CardBody>
        </s.FullHeightCard>
      </Col>

      <Col lg={4} md={4}>
        <s.FullHeightCard
          headerTitle="Considerar nova data alvo:"
          footer={buttons.target_date}
        >
          <s.CardBody>
            {renderVerticalList(
              {
                nickname: answer.nickname,
                target_date: suggestionData.suggestion_target_date,
                target_value: formatMoney(answer.target_value),
                initial_value: formatMoney(answer.initial_value),
                monthly_value: formatMoney(answer.monthly_value),
              },
              'target_date'
            )}
          </s.CardBody>
        </s.FullHeightCard>
      </Col>
    </Row>
  )
}
