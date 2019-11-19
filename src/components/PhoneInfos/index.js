import React from 'react'
import { ReactComponent as TrashIcon } from '../../assets/icons/trashcan.svg'
import TextInput from '../Inputs/Text'
import SelectInput from '../Inputs/Select'
import RadioInput from '../Inputs/Radio'
import { Row, RemoveButton } from './styles'

export default ({ name, index }) => {
  const telefoneOptions = [
    {
      name: 'Comercial',
      value: 1,
    },
    {
      name: 'PABX',
      value: 2,
    },
    {
      name: 'Celular',
      value: 3,
    },
    {
      name: 'Outro',
      value: 4,
    },
  ]
  const radioOptions = [
    {
      name: 'Principal',
      value: 0,
    },
  ]

  return (
    <Row id={`${name}-${index}`}>
      <TextInput
        label="DDI"
        name="ddi"
        width={10}
        paddingRight={15}
        marginRight={15}
      />
      <TextInput label="DDD" name="ddd" width={10} paddingRight={15} />
      <TextInput
        label="Telefone"
        name="telefone"
        width={35}
        paddingLeft={15}
        paddingRight={15}
      />
      <SelectInput
        width={35}
        paddingLeft={15}
        paddingRight={15}
        label="Tipo de telefone"
        name="tipoTelefone"
        options={telefoneOptions}
      />
      <RadioInput
        name="telefonePrincipal"
        options={radioOptions}
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
  )
}
