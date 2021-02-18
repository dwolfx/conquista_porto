import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import AddressCard from '.'

const texts = {
  title: 'Endereço',
  link: 'Alterar no perfil',
  label: {
    zipCode: 'CEP',
    address: 'Endereço',
  },
  form: {
    descriptionFirst: 'Por favor, inclua somente CEPs de endereços no Brasil.',
    descriptionSecond: ' Endereços no exterior não são válidos.',
    labels: {
      zipcode: 'CEP',
      address: 'ENDEREÇO',
      number: 'NÚMEROS',
      complement: 'COMPLEMENTO (OPCIONAL)',
      neighborhood: 'BAIRRO',
      state: 'ESTADO',
      city: 'CIDADE',
    },
    placeholder: {
      zipcode: 'Busca por CEP',
    },
  },
}

const data = {
  bairro: 'Vida Rua',
  cidade: 'São Paulo',
  complementoCep: '000',
  logradouro: 'Avenida Santos',
  numero: '18',
  uf: 'SP',
  numeroCep: '70070',
  tipo: 'RUA',
}

const dataKeyEmpty = {
  bairro: '',
  cidade: '',
  complementoCep: '',
  logradouro: '',
  numero: '',
  uf: '',
  numeroCep: '',
  tipo: '',
}

describe('AddressCard component tests', () => {
  it('should exists', () => {
    expect(AddressCard).toBeDefined()
  })

  it('should exists address Form', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <AddressCard texts={texts} addressData={[dataKeyEmpty, jest.fn()]} />
    )

    const wrapperAddressForm = getByTestId('wrapper-address-form-id')
    expect(wrapperAddressForm).toBeInTheDocument()
  })

  it('should exists wrapper data disply', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <AddressCard texts={texts} addressData={[data, jest.fn()]} />
    )

    const wrapperDataDisplay = getByTestId('wrapper-address-card-id')
    expect(wrapperDataDisplay).toBeInTheDocument()
  })
})
