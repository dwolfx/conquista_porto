import React, { useState } from 'react'
import PropTypes from 'prop-types'

import RadioInput from 'components/Inputs/Radio'
import SelectInput from 'components/Inputs/Select'
import TextInput from 'components/Inputs/Text'
import Icon from 'components/IconExporter'

import { Row, RemoveButton, Wrapper, ButtonAdd } from './styles'
import { bankOptions, modalityOptions } from './values'

const BankComponent = ({ name, showAddButton }) => {
  const [bankSection, setBankSection] = useState([{ index: 0 }])

  const removeBank = index => {
    const newBank = bankSection.filter(el => el.index !== index)

    setBankSection(newBank)
  }

  const renderBankSection = () =>
    bankSection.map(({ index }) => (
      <Wrapper
        id={`${name}-${index}`}
        name="bank-info"
        key={`bank-section-${index}`}
      >
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
            <RemoveButton
              onClick={() => {
                removeBank(index)
              }}
            >
              <Icon name="trash" fill="#30c5ff" width={15} />
            </RemoveButton>
          )}
        </Row>
      </Wrapper>
    ))

  const addBankSection = () => {
    const keyValue = bankSection.length + 1

    const newBank = [...bankSection]
    newBank.push({ index: keyValue })

    setBankSection(newBank)
  }

  return (
    <>
      {renderBankSection()}

      {showAddButton && (
        <Row>
          <ButtonAdd
            onClick={() => {
              addBankSection()
            }}
          >
            <Icon name="add" fill="currentColor" width={20} />
            Adicionar conta
          </ButtonAdd>
        </Row>
      )}
    </>
  )
}

BankComponent.defaultProps = {
  name: '',
  showAddButton: true,
}

BankComponent.propTypes = {
  name: PropTypes.string,
  showAddButton: PropTypes.bool,
}

export default BankComponent
