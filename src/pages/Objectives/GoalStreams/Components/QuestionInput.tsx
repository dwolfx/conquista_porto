import React, { forwardRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'styled-bootstrap-grid'

import { dict } from 'components/IconExporter'
import InputText from 'components/NewInput'
import RadioInput from 'components/Inputs/Radio'
import DateInput from 'components/Inputs/DateInput'
import MoneyInput from 'components/Inputs/Money'

import { ColQuestion, Question, RuleText, InputWrapper } from './styles'

interface IOutterWrapper {
  question: string
  ruleText: string
}

const OutterWrapper: React.FC<IOutterWrapper> = ({
  ruleText,
  question,
  children,
}) => {
  const dadosCliente = useSelector<any, any>(
    state => state.customerProfile.data
  )
  const nomeCliente = dadosCliente?.customerName.split(' ')[0]

  return (
    <>
      <Row justifyContent="center">
        <ColQuestion lg={12} xs={12}>
          <Question>{question.replace('{{{nome}}}', nomeCliente)}</Question>
          {ruleText && <RuleText>{ruleText}</RuleText>}
        </ColQuestion>
      </Row>
      <Row justifyContent="center">
        <Col xs={12}>
          <InputWrapper>{children}</InputWrapper>
        </Col>
      </Row>
    </>
  )
}

interface IProps {
  formData: any
  name: string
  onChangeFormData: (event: any) => void
  options?: {
    name: string
    value: string | number
  }[]
  question: string
  ruleText?: string
  type: string
  error:
    | {
        icon: keyof typeof dict
        message: string
      }
    | boolean
    | null
  placeholder?: string
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
      type,
      error,
      placeholder = '',
    },
    ref
  ) => {
    if (type === 'date') {
      return (
        <OutterWrapper question={question} ruleText={ruleText}>
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
        <OutterWrapper question={question} ruleText={ruleText}>
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
        <OutterWrapper question={question} ruleText={ruleText}>
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
      <OutterWrapper question={question} ruleText={ruleText}>
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
