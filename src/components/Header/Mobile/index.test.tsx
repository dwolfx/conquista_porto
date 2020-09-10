import React from 'react'

import { renderWithReduxAndTheme } from 'testUtils'
import MobileHeader from '.'
import { MemoryRouter } from 'react-router-dom'
import { Store } from 'redux'
import { IItemsProps } from 'components/Dropdown/interface'

import { fireEvent } from '@testing-library/react'

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

const items: IItemsProps[] = [
  {
    icon: 'home',
    text: 'Início',
    path: '/',
  },
  {
    icon: 'apps',
    text: 'Produtos',
    children: [
      {
        icon: 'creditcard',
        text: 'Cartão de Crédito',
        path: '/cartao-credito',
      },
      {
        icon: 'homewithwindow',
        text: 'Consórcio de Imóvel',
        path: '/consorcio-imovel',
      },
      {
        icon: 'car2',
        text: 'Consórcio de Veículo',
        path: '/consorcio-veiculo',
      },
      {
        icon: 'money',
        text: 'Financiamento de Veículo',
        path: '/financiamento-veiculo',
      },
      {
        icon: 'barchart',
        text: 'Investimentos',
        path: '/investimentos',
      },
      {
        icon: 'time',
        text: 'Previdência Privada',
        path: '/previdencia-privada',
      },
      {
        icon: 'persongroup',
        text: 'Seguro de Vida',
        path: '/seguro-vida',
      },
      {
        icon: 'plane',
        text: 'Seguro Viagem',
        path: '/seguro-viagem',
      },
    ],
  },
]

const setup = (
  props = {
    items,
    setIsOpen: () => {},
    customerName: 'teste',
    totalPoints: `${Intl.NumberFormat().format(123)}`,
    exitFunc: () => {},
  },
  store?: Store
) =>
  renderWithReduxAndTheme(
    <MemoryRouter>
      <MobileHeader {...props} />
    </MemoryRouter>,
    { store }
  )

describe('MobileHeader', () => {
  // delete window.location
  // window.location = jest.fn();

  it('should render the hamburguer', () => {
    const { getByTestId } = setup()
    expect(getByTestId('header-mobile-hamburguer')).toBeDefined()
  })

  it('should close menu', () => {
    const { getByTestId } = setup()

    expect(getByTestId('fechar-menu')).toBeTruthy()

    fireEvent.click(getByTestId('fechar-menu'))
  })

  it('should close and go to home', () => {
    const { getByTestId } = setup()

    expect(getByTestId('conquista-logo')).toBeTruthy()

    fireEvent.click(getByTestId('conquista-logo'))
  })

  it('should click responsive-header-menu', () => {
    const { getByTestId } = setup()

    expect(getByTestId('responsive-header-menu')).toBeTruthy()

    fireEvent.click(getByTestId('responsive-header-menu'))
  })

  it('should click sair', () => {
    const { getByTestId } = setup()

    expect(getByTestId('sair')).toBeTruthy()

    fireEvent.click(getByTestId('sair'))
  })
})
