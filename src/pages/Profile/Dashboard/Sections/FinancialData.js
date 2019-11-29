import React from 'react'
import BankComponent from '../../../../components/BankInfos'
import TextInput from '../../../../components/Inputs/Text'
import RadioInput from '../../../../components/Inputs/Radio'
import { Row, LabelText } from '../../styles'

export default () => {
  const qualifiedOptions = [
    {
      name: 'Investidor qualificado',
      value: 0,
    },
    {
      name: 'Investidor profissional',
      value: 1,
    },
    {
      name: 'Outro',
      value: 99,
    },
  ]

  return (
    <>
      <Row>
        <TextInput label="Renda mensal" name="rendaMensal" paddingRight={15} />
        <TextInput
          label="Aplicação financeira"
          name="aplicacaoFinanceira"
          paddingLeft={15}
          paddingRight={15}
        />
        <TextInput label="Patrimônio" name="patrimonio" />
      </Row>

      <BankComponent />

      <Row direction="column">
        <LabelText>Me declaro como:</LabelText>
        <RadioInput name="declaracaoQualificado" options={qualifiedOptions} />
      </Row>
    </>
  )
}
