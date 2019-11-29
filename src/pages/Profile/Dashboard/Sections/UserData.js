/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import AddressFields from '../../../../components/AddressInfos'
import PhoneFields from '../../../../components/PhoneInfos'
import RadioInput from '../../../../components/Inputs/Radio'
import TextInput from '../../../../components/Inputs/Text'
import { Row, LabelText, ObsText } from '../../styles'

export default () => {
  const fiscalAddressOptions = [
    {
      name: 'Não',
      value: 'Não',
    },
    {
      name: 'Sim',
      value: 'Sim',
    },
  ]
  const cotitularOptions = [
    {
      name: 'Não',
      value: 'Não',
    },
    {
      name: 'Sim',
      value: 'Sim',
    },
  ]

  return (
    <>
      <AddressFields index={0} />

      <PhoneFields name="phone-info" numberOfFields={0} />

      <Row>
        <TextInput type="email" label="E-mail" name="email" width={50} />
      </Row>
      <Row>
        <RadioInput
          name="resid-fiscal-estrang"
          title="Você tem residência fiscal estrangeira?"
          options={fiscalAddressOptions}
        />
      </Row>
      <Row direction="column">
        <LabelText>
          Você quer adicionar um cotitular ao seu cadastro como investidor?
        </LabelText>
        <ObsText>
          Se a resposta for "Sim", é preciso que você tenha uma conta conjunta
          com essa pessoa em seu banco.
        </ObsText>
        <RadioInput name="cotitularRadio" options={cotitularOptions} />
      </Row>
    </>
  )
}
