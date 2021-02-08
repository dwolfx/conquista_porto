import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

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

describe('ContactInfoAccidentsCaseCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<ContactInfoAccidentsCaseCard />, {
      store,
    })
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
    renderWithReduxAndTheme(<ContactInfoAccidentsCaseCard />, {
      store,
    })

    expect(screen.getAllByText('Não preenchido')).toHaveLength(2)
  })
})
