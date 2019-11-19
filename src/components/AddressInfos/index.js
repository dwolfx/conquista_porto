import React, { useState } from 'react'
import Icon from '../IconExporter'
import TextInput from '../Inputs/Text'
import RadioInput from '../Inputs/Radio'
import { Row, ButtonAdd, ObsText, Wrapper, RemoveButton } from './styles'
import { mainPhoneOption } from './values'

export default ({ name, showAddButton = true }) => {
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
