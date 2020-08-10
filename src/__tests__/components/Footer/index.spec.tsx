import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import Footer from 'components/Footer'

const store = storeFactory({
  customerProfile: {
    data: {
      cpfCnpj: '36275312807',
      customerName: 'Rubao Teste',
      customerEmail: 'ricardo.eufrasio@portoseguro.com.br',
      customerState: 'SP',
      customerBirthdate: '1981-11-11T00:00:00-03:00',
    },
    status: 'loaded',
    hasError: false,
    isLoading: false,
  },
})

describe('Footer snapshot tests', () => {
  it('Should to render a Footer component', () => {
    const { container } = renderWithReduxAndTheme(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
      { store }
    )
    expect(container).toMatchSnapshot()
  })
})
