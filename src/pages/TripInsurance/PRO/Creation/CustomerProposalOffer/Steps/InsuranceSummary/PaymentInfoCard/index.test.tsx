import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import PaymentInfoCard from '.'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {
      pagamento: {
        codigoBandeira: 7,
        primeiroNumero: '5555',
        segundoNumero: '6666',
        terceiroNumero: '7777',
        quartoNumero: '8884',
        codigoSeguranca: 123,
        mesValidade: '12',
        anoValidade: '25',
        nomeTitular: 'Nome No Cartão',
        quantidadeParcelas: 2,
        isCartaoPorto: true,
      },
    },
  },
}

describe('PaymentInfoCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<PaymentInfoCard />, {
      store,
      container: createRootContainer(),
    })
    expect(PaymentInfoCard).toBeDefined()
  })
  it(`should render error`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {},
      },
    })
    renderWithReduxAndTheme(<PaymentInfoCard />, {
      store,
      container: createRootContainer(),
    })

    expect(screen.getAllByText('Não preenchido')).toHaveLength(4)
  })
  it(`should render 'à vista`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          pagamento: {
            codigoBandeira: 7,
            primeiroNumero: '5555',
            segundoNumero: '6666',
            terceiroNumero: '7777',
            quartoNumero: '8884',
            codigoSeguranca: 123,
            mesValidade: '12',
            anoValidade: '25',
            nomeTitular: 'Nome No Cartão',
            quantidadeParcelas: 1,
            isCartaoPorto: false,
          },
        },
      },
    })
    renderWithReduxAndTheme(<PaymentInfoCard />, {
      store,
      container: createRootContainer(),
    })

    expect(
      screen.getByRole('heading', { name: /R\$ NaN à vista/i })
    ).toBeDefined()
  })
})
