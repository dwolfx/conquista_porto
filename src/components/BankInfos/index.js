import React from 'react'
import { ReactComponent as TrashIcon } from '../../assets/icons/trashcan.svg'
import RadioInput from '../Inputs/Radio'
import SelectInput from '../Inputs/Select'
import TextInput from '../Inputs/Text'
import { Row, RemoveButton, Wrapper } from './styles'

export default ({ name, index }) => {
  const bankOptions = [
    {
      name: 'Unibanco',
      value: 1,
    },
    {
      name: 'Bamerindus',
      value: 2,
    },
  ]
  const modalityOptions = [
    {
      name: 'Individual',
      value: 0,
      disabled: true,
    },
    {
      name: 'Conjunta (obrigatório cadastrar cotitular)',
      value: 1,
    },
  ]

  return (
    <Wrapper id={`${name}-${index}`}>
      <Row>
        <SelectInput
          label="Banco"
          name="banco"
          options={bankOptions}
          paddingRight={15}
          width={35}
        />
        <TextInput
          label="Agência"
          name="agencia"
          paddingLeft={15}
          paddingRight={15}
          width={35}
        />
        <TextInput
          label="Conta"
          name="conta"
          paddingLeft={15}
          paddingRight={15}
          width={20}
        />
        <TextInput label="Dígito" name="digito" paddingLeft={15} width={10} />
      </Row>
      <Row justify="space-between">
        <RadioInput title="Modalidade da conta:" options={modalityOptions} />
        {index !== 0 && (
          <RemoveButton>
            <TrashIcon fill="#30c5ff" width={15} />
          </RemoveButton>
        )}
      </Row>
    </Wrapper>
  )
}
