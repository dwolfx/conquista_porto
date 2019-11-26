import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CEPInput from 'components/Inputs/CEPInput'
import Icon from 'components/IconExporter'
import TextInput from 'components/Inputs/Text'
import RadioInput from 'components/Inputs/Radio'

import { Row, ButtonAdd, ObsText, Wrapper, RemoveButton } from './styles'
import { mainPhoneOption } from './values'

const AddressFields = ({ name, showAddButton }) => {
  const [addressSection, setAddressSection] = useState([{ index: 0 }])

  const removeAddress = index => {
    const newAddress = addressSection.filter(el => el.index !== index)

    setAddressSection(newAddress)
  }

  const renderAddressSection = () =>
    addressSection.map(({ index }) => (
      <Wrapper
        id={`${name}-${index}`}
        name="address-info"
        key={`address-section-${index}`}
      >
        <Row>
          <CEPInput label="CEP" width={15} name="cep" paddingRight={15} />
          <TextInput
            label="Endereço residencial"
            name={`enderecoResidencial-${index}`}
            paddingLeft={15}
            paddingRight={15}
            width={48}
            disabled
          />
          <TextInput
            label="Número"
            name={`numero-${index}`}
            width={12}
            paddingLeft={15}
            paddingRight={15}
          />
          <TextInput
            label="Complemento"
            name={`complemento-${index}`}
            width={25}
            paddingLeft={15}
          />
        </Row>
        <Row>
          <TextInput label="Bairro" name="bairro" paddingRight={15} disabled />
          <TextInput
            label="Estado"
            name={`estado-${index}`}
            paddingLeft={15}
            paddingRight={15}
            disabled
          />
          <TextInput
            label="Cidade"
            name={`cidade-${index}`}
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
            <RemoveButton
              onClick={() => {
                removeAddress(index)
              }}
            >
              <Icon name="trash" fill="#30c5ff" width={15} />
            </RemoveButton>
          )}
        </Row>
      </Wrapper>
    ))

  const addAddressSection = () => {
    const keyValue = addressSection.length + 1

    const newAddress = [...addressSection]
    newAddress.push({ index: keyValue })

    setAddressSection(newAddress)
  }

  return (
    <>
      {renderAddressSection()}

      <Row>
        <ObsText>
          A Porto Seguro não costuma enviar documentação pelo correio. Mas, caso
          seja necessário, enviará para o endereço principal.
        </ObsText>
      </Row>

      {showAddButton && (
        <Row>
          <ButtonAdd
            onClick={() => {
              addAddressSection()
            }}
          >
            <Icon name="add" fill="currentColor" width={20} />
            Adicionar endereço
          </ButtonAdd>
        </Row>
      )}
    </>
  )
}

AddressFields.defaultProps = {
  showAddButton: true,
}

AddressFields.propTypes = {
  name: PropTypes.string,
  showAddButton: PropTypes.bool,
}

export default AddressFields
