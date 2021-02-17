import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import ContactInfoAccidentsCaseCard from '.'

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {
      passageiroPrincipal: {
        contato: {
          nome: 'Contato Do Passageiro Principal',
          celularDDD: '11',
          celularNumero: '932216554',
        },
      },
    },
  },
}

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

describe('ContactInfoAccidentsCaseCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(
      <ContactInfoAccidentsCaseCard setHasEmptyData={() => {}} />,
      {
        store,
        container: createRootContainer(),
      }
    )
    expect(ContactInfoAccidentsCaseCard).toBeDefined()
  })
  it(`should render error`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          passageiroPrincipal: {
            contato: {
              nome: '',
              celularDDD: '',
              celularNumero: '',
            },
          },
        },
      },
    })
    renderWithReduxAndTheme(
      <ContactInfoAccidentsCaseCard setHasEmptyData={() => {}} />,
      {
        store,
        container: createRootContainer(),
      }
    )

    expect(screen.getAllByText('Não preenchido')).toHaveLength(2)
  })
  it(`should trigger drawer`, () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(
      <ContactInfoAccidentsCaseCard setHasEmptyData={() => {}} />,
      {
        store,
        container: createRootContainer(),
      }
    )

    const button = screen.getByText('ALTERAR')
    userEvent.click(button)
    userEvent.click(screen.getByText('close.svg'))
    userEvent.click(button)

    expect(
      screen.getAllByText('Alterar contato em caso de acidente')
    ).toBeDefined()

    expect(screen.getByTestId('nome')).toHaveValue(
      'Contato Do Passageiro Principal'
    )
    expect(screen.getByTestId('telefone')).toHaveValue('(11) 9 3221-6554')
  })
})
