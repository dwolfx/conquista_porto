import React, { forwardRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'styled-bootstrap-grid'

import Icon, { dict } from 'components/IconExporter'
import Popover from 'components/Popover'
import InputText from 'components/NewInput'
import RadioInput from 'components/Inputs/Radio'
import DateInput from 'components/Inputs/DateInput'
import MoneyInput from 'components/Inputs/Money'

import useMedia from 'hooks/useMedia'

import { IData } from '../types'
import {
  ColQuestion,
  Question,
  RuleText,
  InputWrapper,
  FormWrapper,
} from './styles'

interface IOutterWrapper {
  button?: React.ReactNode
  question: string
  ruleText?: string
  sideTip?: React.ReactNode
  tooltip?: React.ReactNode
}

const OutterWrapper: React.FC<IOutterWrapper> = ({
  button,
  question,
  children,
  ruleText,
  sideTip,
  tooltip,
}) => {
  const isMobile = useMedia('xs')
  const dadosCliente = useSelector<any, any>(
    state => state.customerProfile.data
  )
  const nomeCliente = dadosCliente?.customerName.split(' ')[0]

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
              {question.replace('{{{nome}}}', nomeCliente)}{' '}
              {isMobile && tooltip && (
                <Popover content={() => tooltip}>
                  <Icon name="information" color="gray4" width={21} />
                </Popover>
              )}
            </Question>
            {ruleText && <RuleText>{ruleText}</RuleText>}
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
}

const QuestionInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      formData,
      name,
      onChangeFormData,
      options,
      question,
      ruleText = '',
      sideTip,
      tooltip,
      type,
      error,
      placeholder = '',
      button,
    },
    ref
  ) => {
    if (type === 'date') {
      return (
        <OutterWrapper
          question={question}
          ruleText={ruleText}
          sideTip={sideTip}
          tooltip={tooltip}
          button={button}
        >
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
        <OutterWrapper
          question={question}
          ruleText={ruleText}
          sideTip={sideTip}
          tooltip={tooltip}
          button={button}
        >
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
        <OutterWrapper
          question={question}
          ruleText={ruleText}
          sideTip={sideTip}
          tooltip={tooltip}
          button={button}
        >
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

    return (
      <OutterWrapper
        question={question}
        ruleText={ruleText}
        sideTip={sideTip}
        tooltip={tooltip}
        button={button}
      >
        <InputText
          data-gtm-form="input"
          data-gtm-name={name}
          ref={ref}
          name={name}
          onChange={handleChange}
          suffix={<>{inputCounter}/20</>}
          value={formData[name]}
          error={error || false}
          maxLength={20}
          placeholder="MeuObjetivo"
        />
      </OutterWrapper>
    )
  }
)

export default QuestionInput
