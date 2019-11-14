/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { ReactComponent as AddIcon } from '../../../../assets/icons/add.svg'
import AddressFields from '../../../../components/AddressInfos'
import PhoneFields from '../../../../components/PhoneInfos'
import RadioInput from '../../../../components/Inputs/Radio'
import TextInput from '../../../../components/Inputs/Text'
import { Row, LabelText, ObsText, ButtonAdd } from '../../styles'

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

      <Row>
        <ObsText>
          A Porto Seguro não costuma enviar documentação pelo correio. Mas, caso
          seja necessário, enviará para o endereço principal.
        </ObsText>
      </Row>

      <Row>
        <ButtonAdd>
          <AddIcon fill="currentColor" width={20} />
          Adicionar endereço
        </ButtonAdd>
      </Row>

      <PhoneFields index={0} />

      <Row>
        <ButtonAdd>
          <AddIcon fill="currentColor" width={20} />
          Adicionar telefone
        </ButtonAdd>
      </Row>

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
