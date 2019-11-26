import React from 'react'

import CPFInput from 'components/Inputs/CPFInput'
import DateInput from 'components/Inputs/DateInput'
import TextInput from 'components/Inputs/Text'
import SelectInput from 'components/Inputs/Select'
import RadioInput from 'components/Inputs/Radio'

import { Row } from '../../styles'

export default () => {
  const documentoOptions = [
    {
      name: 'RG',
      value: 12,
    },
    {
      name: 'RNE',
      value: 14,
    },
    {
      name: 'CNH',
      value: 7,
    },
    {
      name: 'Passaporte',
      value: 11,
    },
  ]
  const sexoOptions = [
    {
      name: 'Masculino',
      value: 0,
    },
    {
      name: 'Feminino',
      value: 1,
    },
  ]
  const nacionalidadeOptions = [
    {
      name: 'Brasileiro nato',
      value: 0,
    },
    {
      name: 'Brasileiro naturalizado',
      value: 1,
    },
    {
      name: 'Estrangeiro',
      value: 2,
    },
  ]
  const estadoCivilOptions = [
    {
      name: 'Casado',
      value: 0,
    },
    {
      name: 'Solteiro',
      value: 1,
    },
    {
      name: 'Divorciado',
      value: 2,
    },
    {
      name: 'Separado',
      value: 3,
    },
    {
      name: 'Viúvo',
      value: 4,
    },
    {
      name: 'Outro(a)',
      value: 5,
    },
  ]
  const ppeOptions = [
    {
      name: 'Não',
      value: 'Não',
    },
    {
      name: 'Sim',
      value: 'Sim',
    },
    {
      name: 'Relacionamento próximo',
      value: 'Relacionamento próximo',
    },
  ]

  return (
    <>
      <Row justify="space-between">
        <TextInput width={60} paddingRight={15} label="Nome" name="nome" />
        <CPFInput width={40} paddingLeft={15} label="CPF" name="cpf" />
      </Row>
      <Row>
        <SelectInput
          label="Tipo de documento"
          width={40}
          paddingRight={15}
          name="tipoDocumento"
          options={documentoOptions}
        />
        <TextInput
          width={60}
          paddingLeft={15}
          label="Número do documento"
          name="numeroDocumento"
        />
      </Row>
      <Row>
        <DateInput
          width={33.3}
          paddingRight={15}
          label="Data de nascimento"
          name="dataNascimento"
        />
        <SelectInput
          width={33.3}
          paddingRight={15}
          paddingLeft={15}
          label="Sexo"
          name="sexo"
          options={sexoOptions}
        />
        <SelectInput
          width={33.3}
          paddingLeft={15}
          label="Nacionalidade"
          name="nacionalidade"
          options={nacionalidadeOptions}
        />
      </Row>
      <Row>
        <TextInput width={50} paddingRight={15} label="Nome da mãe" />
        <TextInput width={50} paddingLeft={15} label="Nome do pai" />
      </Row>
      <Row>
        <SelectInput
          width={33.3}
          paddingRight={15}
          label="Estado civil"
          name="estadoCivil"
          options={estadoCivilOptions}
        />
        <TextInput
          width={33.3}
          paddingRight={15}
          paddingLeft={15}
          label="Nome do cônjuge"
          disabled
        />
        <CPFInput
          width={33.3}
          paddingLeft={15}
          label="CPF do cônjuge"
          disabled
        />
      </Row>
      <Row>
        <RadioInput
          title="Você é uma Pessoa Politicamente Exposta (PPE)?"
          options={ppeOptions}
        />
      </Row>
    </>
  )
}
