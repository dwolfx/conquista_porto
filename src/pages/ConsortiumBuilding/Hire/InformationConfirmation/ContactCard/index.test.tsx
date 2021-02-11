import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'
import { createStore } from 'redux'
import ContactCard from '.'

const reducerMock = {
  customerProfile: {
    data: {
      cpfCnpj: '36275312807',
      customerName: 'Rubao',
      customerEmail: 'ricardo.eufrasio@portoseguro.com.br',
      customerState: 'SP',
      customerBirthdate: '1981-11-11T00:00:00-03:00',
      customerPhoneNumber: '996229303',
      customerAreaCode: '11',
      customerGender: 'M',
    },
    status: 'loaded',
    hasError: false,
    isLoading: false,
  },
}

const ContactCardComponent = () => {
  const labels = {
    email: 'E-mail',
    phone: 'Celular',
  }

  return <ContactCard label={labels} />
}

describe('ContactCard', () => {
  const storeMock = (state = reducerMock) => state
  const store = createStore(storeMock)

  it('Should exist', () => {
    expect(ContactCardComponent).toBeDefined()
  })

  it('Should show data display exist', () => {
    renderWithReduxAndTheme(<ContactCardComponent />, {
      store,
    })

    expect(
      screen.getByText('ricardo.eufrasio@portoseguro.com.br')
    ).toBeInTheDocument()
    expect(screen.getByText('+55 (11) 9962-9303')).toBeInTheDocument()
  })
})
