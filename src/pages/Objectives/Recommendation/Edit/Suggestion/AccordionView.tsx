import React, { useContext } from 'react'
import { Row, Col } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import { uuid } from 'uuidv4'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Text from 'components/Text'
import VerticalList from 'components/VerticalList'

import { formatMoney } from 'helpers'

import AnswerForm from 'pages/Objectives/Recommendation/Edit/commons/AnswerForm'

import { IView, answerLabels } from './types'
import * as s from './styles'

export default function SuggestionAccordion({
  editValues,
  setEditValues,
  answer,
  suggestionData,
  buttons,
  setError,
}: IView) {
  const theme = useContext(ThemeContext)

  const renderVerticalList = (
    // data: Omit<IAnswer, 'uf' | 'goal_type' | 'profile'>,
    data: { [key: string]: string },
    type: 'monthly_value' | 'target_date'
  ) => (
    <s.VerticalListRow>
      {Object.entries(data).map(([key, value], index) => (
        <s.VerticalListCol sm={4} key={uuid()}>
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
                {type === key && (
                  <Icon name="check" width={21} color="green4" />
                )}
              </s.ValueText>,
            ]}
          />
        </s.VerticalListCol>
      ))}
    </s.VerticalListRow>
  )

  return (
    <Row>
      <Col>
        <s.Accordion
          triggerCloseOnArrow
          bodyPadding={`${theme.spacing(2)}px 0 0`}
          titleNode={
            <Text type="heading4" bold color="gray6">
              Editar os dados preenchidos
            </Text>
          }
        >
          <s.AccordionBody>
            <AnswerForm
              values={editValues}
              updateValues={setEditValues}
              colSizes={{ sm: 6 }}
              setHasError={setError}
            />
          </s.AccordionBody>

          {buttons.recalculate}
        </s.Accordion>

        <s.Accordion
          triggerCloseOnArrow
          bodyPadding={`${theme.spacing(2)}px 0 0`}
          titleNode={
            <Text type="heading4" bold color="gray6">
              Considerar novo valor mensal
            </Text>
          }
        >
          <s.AccordionBody>
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
          </s.AccordionBody>

          {buttons.monthly_value}
        </s.Accordion>

        <s.Accordion
          triggerCloseOnArrow
          bodyPadding={`${theme.spacing(2)}px 0 0`}
          titleNode={
            <Text type="heading4" bold color="gray6">
              Considerar nova data alvo
            </Text>
          }
        >
          <s.AccordionBody>
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
          </s.AccordionBody>

          {buttons.target_date}
        </s.Accordion>
      </Col>
    </Row>
  )
}
