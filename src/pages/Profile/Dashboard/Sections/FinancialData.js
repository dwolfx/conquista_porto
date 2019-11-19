import React from 'react'
import { ReactComponent as AddIcon } from '../../../../assets/icons/add.svg'
import BankInfos from '../../../../components/BankInfos'
import TextInput from '../../../../components/Inputs/Text'
import RadioInput from '../../../../components/Inputs/Radio'
import { Row, ButtonAdd, LabelText } from '../../styles'

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

      <BankInfos name="bank-info" index={0} />

      <Row>
        <ButtonAdd>
          <AddIcon fill="currentColor" width={20} />
          Adicionar conta
        </ButtonAdd>
      </Row>
      <Row direction="column">
        <LabelText>Me declaro como:</LabelText>
        <RadioInput name="declaracaoQualificado" options={qualifiedOptions} />
      </Row>
    </>
  )
}
