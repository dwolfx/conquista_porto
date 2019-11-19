import React from 'react'
import { ReactComponent as TrashIcon } from '../../assets/icons/trashcan.svg'
import TextInput from '../Inputs/Text'
import RadioInput from '../Inputs/Radio'
import { Wrapper, Row, RemoveButton } from './styles'

export default ({ name, index }) => {
  const mainPhoneOption = [
    {
      name: 'Principal',
      value: `phone-${index}`,
    },
  ]

  return (
    <Wrapper id={`${name}-${index}`}>
      <Row>
        <TextInput label="CEP" width={15} name="cep" paddingRight={15} />
        <TextInput
          label="Endereço residencial"
          name="enderecoResidencial"
          paddingLeft={15}
          paddingRight={15}
          width={48}
          disabled
        />
        <TextInput
          label="Número"
          name="numero"
          width={12}
          paddingLeft={15}
          paddingRight={15}
        />
        <TextInput
          label="Complemento"
          name="complemento"
          width={25}
          paddingLeft={15}
        />
      </Row>
      <Row>
        <TextInput label="Bairro" name="bairro" paddingRight={15} disabled />
        <TextInput
          label="Estado"
          name="estado"
          paddingLeft={15}
          paddingRight={15}
          disabled
        />
        <TextInput
          label="Cidade"
          name="cidade"
          paddingLeft={15}
          paddingRight={15}
          disabled
        />
        <RadioInput
          name={name}
          options={mainPhoneOption}
          paddingLeft={15}
          paddingRight={5}
          marginRight={5}
        />
        {index !== 0 && (
          <RemoveButton>
            <TrashIcon fill="#30c5ff" width={15} />
          </RemoveButton>
        )}
      </Row>
    </Wrapper>
  )
}
