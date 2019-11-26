import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'
import PhoneInput from 'components/Inputs/PhoneInput'
import TextInput from 'components/Inputs/Text'
import SelectInput from 'components/Inputs/Select'
import RadioInput from 'components/Inputs/Radio'

import { Row, ButtonAdd, RemoveButton } from './styles'
import { telefoneOptions, radioOptions } from './values'

const PhoneFields = ({ name, showAddButton }) => {
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
        <TextInput
          label="DDD"
          maxLength="3"
          name="ddd"
          width={10}
          paddingRight={15}
        />
        <PhoneInput
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

PhoneFields.defaultProps = {
  showAddButton: true,
}

PhoneFields.propTypes = {
  name: PropTypes.string,
  showAddButton: PropTypes.bool,
}

export default PhoneFields
