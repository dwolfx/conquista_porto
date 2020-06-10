import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'styled-bootstrap-grid'
import moment from 'moment'

import Icon from 'components/IconExporter'
import Popover from 'components/Popover'

import useMedia from 'hooks/useMedia'
import {
  formatMoney,
  formatLocaleStringToNumber,
  replacePatternToComponent,
} from 'helpers'

import { IData } from 'pages/Objectives/GoalStreams/types'

import SuggestionTag from './SuggestionTag'
import * as s from '../styles'

interface IProps extends Omit<IData, 'question' | 'name' | 'type'> {
  question?: string
  description?: string
  type?: string
  formData?: any
  button?: React.ReactNode
  children: React.ReactNode
  onTagClick?: (e: any) => void
}

const OutterWrapper = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      children,
      formData,
      question,
      description,
      sideTip,
      tooltip,
      button,
      suggestionValues,
      type,
      onTagClick,
    },
    ref
  ) => {
    const isMobile = useMedia('xs')
    const { target_value, target_date, initial_value } = formData

    const dadosCliente = useSelector<any, any>(
      state => state.customerProfile.data
    )

    const nomeCliente = dadosCliente?.customerName.split(' ')[0]
    const targetDateDiff = moment(target_date, 'DD/MM/YYYY').diff(
      moment(),
      'months'
    )

    /**
     * monthlyIncomeRate: fixed value of 4.5% per year
     * recommendedMonthlyValue: returns the expected monthly value so that the target value is reached
     */
    const monthlyIncomeRate = 4.5 / (12 * 100)
    const recommededMonthlyValue = Math.ceil(
      (monthlyIncomeRate *
        (formatLocaleStringToNumber(target_value) -
          formatLocaleStringToNumber(initial_value) *
            Math.pow(1 + monthlyIncomeRate, targetDateDiff))) /
        (Math.pow(1 + monthlyIncomeRate, targetDateDiff) - 1)
    )

    const questionToDisplay = question?.replace('{{{nome}}}', nomeCliente)
    const descriptionToDisplay =
      recommededMonthlyValue > 0
        ? replacePatternToComponent(
            description
              ?.replace('{{{VALOR_META}}}', `R$ ${target_value}`)
              ?.replace('{{{PRAZO}}}', target_date) || '',
            /(\{{{VALOR}}})/g,
            <span>{formatMoney(recommededMonthlyValue)}</span>
          )
        : description?.split('.')[0]

    return (
      <s.FormWrapper>
        <s.FormCol
          lg={4}
          md={sideTip ? 6 : 10}
          sm={sideTip ? 7 : 12}
          xs={12}
          lgOffset={4}
          mdOffset={1}
        >
          <Row justifyContent="center">
            <s.ColQuestion lg={12} xs={12}>
              <s.Question>
                {questionToDisplay}{' '}
                {isMobile && tooltip && (
                  <Popover content={() => tooltip}>
                    <Icon name="information" color="gray4" width={21} />
                  </Popover>
                )}
              </s.Question>
              {descriptionToDisplay && (
                <s.DescriptionText type="caption" color="gray5" bold>
                  {descriptionToDisplay}
                </s.DescriptionText>
              )}
            </s.ColQuestion>
          </Row>
          <s.InputRow justifyContent="center">
            <Col xs={12}>
              <s.InputWrapper>
                {suggestionValues && (
                  <SuggestionTag
                    type={type}
                    options={suggestionValues}
                    ref={ref}
                    onClick={onTagClick}
                  />
                )}
                {children}
              </s.InputWrapper>
            </Col>
          </s.InputRow>

          {button}
        </s.FormCol>
        {!isMobile && sideTip && (
          <Col lg={3} md={4} sm={5}>
            {sideTip}
          </Col>
        )}
      </s.FormWrapper>
    )
  }
)

export default OutterWrapper
