import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import DrawerChangePayment from './index'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const defaultStore = {
  fluxManagement: {
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
      formasPagamento: {
        listaParcelamentoCartao: [
          {
            valor: '33.63',
            id: '1',
            descricao: 'À vista',
          },
          {
            valor: '16.82',
            id: '2',
            descricao: '2x',
          },
          {
            valor: '11.21',
            id: '3',
            descricao: '3x',
          },
          {
            valor: '8.41',
            id: '4',
            descricao: '4x',
          },
          {
            valor: '6.73',
            id: '5',
            descricao: '5x',
          },
          {
            valor: '5.61',
            id: '6',
            descricao: '6x',
          },
          {
            valor: '4.8',
            id: '7',
            descricao: '7x',
          },
          {
            valor: '4.2',
            id: '8',
            descricao: '8x',
          },
          {
            valor: '3.74',
            id: '9',
            descricao: '9x',
          },
          {
            valor: '3.36',
            id: '10',
            descricao: '10x',
          },
          {
            valor: '3.06',
            id: '11',
            descricao: '11x',
          },
          {
            valor: '2.8',
            id: '12',
            descricao: '12x',
          },
        ],
        listaParcelamentoCartaoPorto: [
          {
            valor: '31.94',
            id: '1',
            descricao: 'À vista',
          },
          {
            valor: '15.97',
            id: '2',
            descricao: '2x',
          },
          {
            valor: '10.65',
            id: '3',
            descricao: '3x',
          },
          {
            valor: '7.99',
            id: '4',
            descricao: '4x',
          },
          {
            valor: '6.39',
            id: '5',
            descricao: '5x',
          },
          {
            valor: '5.32',
            id: '6',
            descricao: '6x',
          },
          {
            valor: '4.56',
            id: '7',
            descricao: '7x',
          },
          {
            valor: '3.99',
            id: '8',
            descricao: '8x',
          },
          {
            valor: '3.55',
            id: '9',
            descricao: '9x',
          },
          {
            valor: '3.19',
            id: '10',
            descricao: '10x',
          },
          {
            valor: '2.9',
            id: '11',
            descricao: '11x',
          },
          {
            valor: '2.66',
            id: '12',
            descricao: '12x',
          },
        ],
      },
    },
  },
}

const setup = (initialState: {}) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(
    <DrawerChangePayment isOpen handleClose={() => {}} />,
    { store, container: createRootContainer() }
  )
}

describe('Change Payment Drawer Component', () => {
  it('should exists', () => {
    expect(DrawerChangePayment).toBeDefined()
  })

  it('Should be visible portion quotation', () => {
    setup(defaultStore)

    expect(screen.getByDisplayValue('2x de R$ 15,97')).toBeVisible()
  })
})
