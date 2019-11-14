import React from 'react'
import { ReactComponent as AddIcon } from '../../../../assets/icons/add.svg'
import TextInput from '../../../../components/Inputs/Text'
import RadioInput from '../../../../components/Inputs/Radio'
import { Row, ButtonAdd } from '../../styles'

export default () => {
  const workingQuestionMark = [
    {
      name: 'Sim',
      value: 'Sim',
    },
    {
      name: 'Não',
      value: 'Não',
    },
  ]

  return (
    <>
      <Row>
        <TextInput
          label="Profissão"
          name="profissao"
          paddingRight={30}
          width={50}
        />
        <RadioInput
          title="Você está trabalhando?"
          options={workingQuestionMark}
        />
      </Row>
      <Row>
        <ButtonAdd>
          <AddIcon fill="currentColor" width={20} />
          Adicionar telefone
        </ButtonAdd>
      </Row>
      <Row>
        <TextInput
          label="E-mail profissional"
          name="emailProfissional"
          type="email"
          width={50}
        />
      </Row>
    </>
  )
}
