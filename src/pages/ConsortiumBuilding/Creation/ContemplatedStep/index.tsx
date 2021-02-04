import React, { useState } from 'react'
import Text from 'components/Text'
import * as s from './styles'
import { dict } from 'components/IconExporter'

const ContemplatedStep = () => {
  const [contemplateValue, setContemplateValue] = useState({
    touched: false,
    value: '',
  })
  const [isValid, setIsValid] = useState(false)

  const validateInput = (value: string) => {
    setContemplateValue({ touched: true, value })
    if (
      parseInt(value.replace(/\./g, '')) < 50000 ||
      parseInt(value.replace(/\./g, '')) > 500000
    ) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  const handleButtonClick = () => {}

  return (
    <s.ContentWrapper>
      <s.ContentContainer>
        <Text type="headline" color="gray6" textAlign="center">
          Qual valor você planeja receber ao ser contemplado?
        </Text>
        <s.QuestionText type="title" color="gray5" textAlign="center">
          Valores disponíveis entre 50 e 500 mil reais.
        </s.QuestionText>
        <s.InputMoney
          data-testid="financial-application-money-input"
          data-gtm-form="input"
          data-gtm-name="quanto investir"
          value={contemplateValue.value}
          placeholder="0,00"
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            validateInput(target.value)
          }
          error={
            contemplateValue.touched &&
            !isValid && {
              icon: 'alertrounded' as keyof typeof dict,
              message: 'O valor deve ser entre R$ 50.000,00 e R$ 500.000,00',
            }
          }
        />
        <s.StyledButton
          data-gtm-name="Simular"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          color="secondary"
          onClick={handleButtonClick}
          disabled={!isValid}
        >
          Simular
        </s.StyledButton>
      </s.ContentContainer>
    </s.ContentWrapper>
  )
}

export default ContemplatedStep
