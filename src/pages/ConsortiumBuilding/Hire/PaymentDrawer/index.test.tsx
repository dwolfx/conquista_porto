import React from 'react'

import 'jest-styled-components'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import PaymentDrawer from '.'

const defaultStore = {
  fluxManagement: {
    stack: [{}],
    form: {},
  },
}

const createRootContainer = () => {
  let portalRoot = document.getElementById('root')
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }
  return portalRoot
}

const setup = (initialState: any) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(
    <PaymentDrawer isOpen handleClose={() => {}} />,
    {
      store,
      container: createRootContainer(),
    }
  )
}

describe('PaymentDrawer component', () => {
  it('should exists', () => {
    setup(defaultStore)
    expect(PaymentDrawer).toBeDefined()
  })
  it('should change the option the when radio is clicked', () => {
    setup(defaultStore)
    const automaticDebit = screen.getByRole('radio', {
      name: 'debito-automatico',
    })
    const PaymentSlip = screen.getByRole('radio', { name: 'boleto' })

    userEvent.click(PaymentSlip)
    expect(PaymentSlip).toBeChecked()

    userEvent.click(automaticDebit)
    expect(automaticDebit).toBeChecked()
  })
  it('should call handleClose when the save changes button is clicked', () => {
    const store = storeFactory(defaultStore)
    const handleClick = jest.fn()
    renderWithReduxAndTheme(
      <PaymentDrawer isOpen handleClose={handleClick} />,
      {
        store,
        container: createRootContainer(),
      }
    )

    const saveChangesButton = screen.getByRole('button', {
      name: 'Salvar alterações',
    })

    userEvent.click(saveChangesButton)

    expect(handleClick).toHaveBeenCalled()
  })
  it('should render modal', () => {
    window.resizeTo(400, 600)

    setup(defaultStore)

    expect(screen.getByText(/alterar pagamento/i)).toBeDefined()
  })
})
