import React, { useState } from 'react'
import Icon from '../IconExporter'
import TextInput from '../Inputs/Text'
import SelectInput from '../Inputs/Select'
import RadioInput from '../Inputs/Radio'
import { Row, ButtonAdd, RemoveButton } from './styles'
import { telefoneOptions, radioOptions } from './values'

export default ({ name, showAddButton = true }) => {
  const [phoneSection, setPhoneSection] = useState([
    {
      index: 0,
    },
  ])

  const removePhone = index => {
    const newPhone = phoneSection.filter(el => el.index !== index)

    setPhoneSection(newPhone)
  }

  const renderPhoneSection = () =>
    phoneSection.map(({ index }) => (
      <Row
        id={`${name}-${index}`}
        name="phone-info"
        key={`phone-section-${index}`}
      >
        <TextInput
          label="DDI"
          name="ddi"
          maxLength="3"
          width={10}
          paddingRight={15}
          marginRight={15}
        />
        <TextInput label="DDD" name="ddd" width={10} paddingRight={15} />
        <TextInput
          label="Telefone"
          name="telefone"
          maxLength="3"
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
          <RemoveButton
            onClick={() => {
              removePhone(index)
            }}
          >
            <Icon name="trash" fill="#30c5ff" width={15} />
          </RemoveButton>
        )}
      </Row>
    ))

  const addPhoneSection = () => {
    const keyValue = phoneSection.length

    const newPhone = [...phoneSection]
    newPhone.push({ index: keyValue })

    setPhoneSection(newPhone)
  }

  return (
    <>
      {renderPhoneSection()}

      {showAddButton && (
        <Row>
          <ButtonAdd
            onClick={() => {
              addPhoneSection()
            }}
          >
            <Icon name="add" fill="currentColor" width={20} />
            Adicionar telefone
          </ButtonAdd>
        </Row>
      )}
    </>
  )
}
