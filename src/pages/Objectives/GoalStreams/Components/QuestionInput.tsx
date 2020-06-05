import React, { forwardRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'styled-bootstrap-grid'
import moment from 'moment'

import Icon, { dict } from 'components/IconExporter'
import Popover from 'components/Popover'
import RadioInput from 'components/Inputs/Radio'
import DateInput from 'components/Inputs/DateInput'
import MoneyInput from 'components/Inputs/Money'

import useMedia from 'hooks/useMedia'
import {
  formatMoney,
  formatLocaleStringToNumber,
  replacePatternToComponent,
} from 'helpers'

import { IData } from '../types'
import {
  ColQuestion,
  Question,
  DescriptionText,
  InputNickname,
  InputWrapper,
  FormWrapper,
} from './styles'

interface IOutterWrapper {
  question?: string
  description?: string
  formData?: any
  sideTip?: React.ReactNode
  tooltip?: React.ReactNode
  button?: React.ReactNode
}

const OutterWrapper: React.FC<IOutterWrapper> = ({
  children,
  formData,
  question,
  description,
  sideTip,
  tooltip,
  button,
}) => {
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
      : null

  return (
    <FormWrapper>
      <Col
        lg={4}
        md={sideTip ? 6 : 10}
        sm={sideTip ? 7 : 12}
        xs={12}
        lgOffset={4}
        mdOffset={1}
      >
        <Row justifyContent="center">
          <ColQuestion lg={12} xs={12}>
            <Question>
              {questionToDisplay}{' '}
              {isMobile && tooltip && (
                <Popover content={() => tooltip}>
                  <Icon name="information" color="gray4" width={21} />
                </Popover>
              )}
            </Question>
            {descriptionToDisplay && (
              <DescriptionText type="caption" color="gray5" bold>
                {descriptionToDisplay}
              </DescriptionText>
            )}
          </ColQuestion>
        </Row>
        <Row justifyContent="center">
          <Col xs={12}>
            <InputWrapper>{children}</InputWrapper>
          </Col>
        </Row>

        {button}
      </Col>
      {!isMobile && sideTip && (
        <Col lg={3} md={4} sm={5}>
          {sideTip}
        </Col>
      )}
    </FormWrapper>
  )
}

interface IProps extends IData {
  formData: any
  onChangeFormData: (event: any) => void
  options?: {
    name: string
    value: string | number
  }[]
  error:
    | {
        icon: keyof typeof dict
        message: string
      }
    | boolean
    | null
  button?: React.ReactNode
  category?: string | undefined
  valueNickname: boolean
}

const QuestionInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      formData,
      name,
      onChangeFormData,
      options,
      type,
      error,
      placeholder = '',
      category,
      valueNickname,
      ...rest
    },
    ref
  ) => {
    if (type === 'date') {
      return (
        <OutterWrapper formData={formData} {...rest}>
          <DateInput
            data-gtm-form="input"
            data-gtm-name={name}
            ref={ref}
            name={name}
            onChange={onChangeFormData}
            value={formData[name]}
            error={error || false}
            newInput
            placeholder="dd/mm/aaaa"
          />
        </OutterWrapper>
      )
    }
    if (type === 'bool') {
      return (
        <OutterWrapper formData={formData} {...rest}>
          <RadioInput
            name={name}
            onChange={onChangeFormData}
            options={options}
            checkedItem={formData[name]}
          />
        </OutterWrapper>
      )
    }
    if (type === 'number') {
      return (
        <OutterWrapper formData={formData} {...rest}>
          <MoneyInput
            data-gtm-form="input"
            data-gtm-name={name}
            ref={ref}
            name={name}
            onChange={onChangeFormData}
            value={formData[name]}
            error={error || false}
            maxLength={14}
            placeholder={placeholder}
          />
        </OutterWrapper>
      )
    }

    const [inputCounter, setInputCounter] = useState<number>(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputCounter(e.target.value.length)

      onChangeFormData(e)
    }

    useEffect(() => {
      if (valueNickname)
        setInputCounter(formData[name].length || category?.length)
    }, [category, formData, name, valueNickname])

    return (
      <OutterWrapper formData={formData} {...rest}>
        <InputNickname
          data-gtm-form="input"
          data-gtm-name={name}
          ref={ref}
          name={name}
          onChange={handleChange}
          suffix={<>{inputCounter}/20</>}
          value={formData[name]}
          error={error || false}
          maxLength={20}
          placeholder={category}
        />
      </OutterWrapper>
    )
  }
)

export default QuestionInput
