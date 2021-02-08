import React, { useState } from 'react'
import Text from 'components/Text'
import { texts } from 'pages/ConsortiumBuilding/commons/Texts'
import { ErrorForm } from 'pages/ConsortiumBuilding/commons/ErrorForm'
import * as s from './styles'

const ContemplatedStep = () => {
  const [contemplateValue, setContemplateValue] = useState({
    touched: false,
    value: '',
  })
  const [isValid, setIsValid] = useState(false)

  const validateInput = (value: string) => {
    setContemplateValue({ touched: true, value })
    if (
      Number(value.replace(/\./g, '')) < 50000 ||
      Number(value.replace(/\./g, '')) > 500000
    ) {
      return setIsValid(false)
    }
    return setIsValid(true)
  }

  const handleButtonClick = () => {}

  const { creation, buttons } = texts('50 e 500 mil reais')
  const { coveredValue } = ErrorForm('50 e 500 mil reais')

  return (
    <s.ContentWrapper>
      <s.ContentContainer>
        <Text type="headline" color="gray6" textAlign="center">
          {creation.steps.value.title}
        </Text>
        <s.QuestionText type="title" color="gray5" textAlign="center">
          {creation.steps.value.description}
        </s.QuestionText>
        <s.InputMoney
          data-testid="financial-application-money-input"
          data-gtm-form="input"
          data-gtm-name="quanto investir"
          value={contemplateValue.value}
          placeholder={creation.steps.value.inputLabel}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            validateInput(target.value)
          }
          error={contemplateValue.touched && !isValid && coveredValue}
        />
        <s.StyledButton
          data-gtm-name="Simular"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="secondary"
          onClick={handleButtonClick}
          disabled={!isValid}
        >
          {buttons.simulate}
        </s.StyledButton>
      </s.ContentContainer>
    </s.ContentWrapper>
  )
}

export default ContemplatedStep
