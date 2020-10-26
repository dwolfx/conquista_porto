import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import EditingCardData from './index'

import { ICreditCardExpirationDays } from 'store/modules/CreditCard/ExpirationDays/types'

const formData = {
  cardData: {
    flag: { id: 1, name: 'Mastercard' },
    dueDate: { id: 2, name: '02' },
  },
}

const defaultStore = {
  creditCardExpirationDays: {
    data: {
      bandeiras: [
        { bandeira: 'VISA', codBandeira: '1', descricao: '1' },
        { bandeira: 'VISA', codBandeira: '1', descricao: '3' },
        { bandeira: 'MASTER', codBandeira: '2', descricao: '20' },
      ],
      codRetorno: '0',
      mastercard: [{ bandeira: 'MASTER', codBandeira: '2', descricao: '20' }],
      visa: [
        { bandeira: 'VISA', codBandeira: '1', descricao: '1' },
        { bandeira: 'VISA', codBandeira: '1', descricao: '3' },
      ],
      msgRetorno: 'Consulta realizada com sucesso.',
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

const setup = (initialState: {
  creditCardExpirationDays: { data: ICreditCardExpirationDays }
}) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(
    <EditingCardData
      isOpen
      handleClose={() => {}}
      formData={formData}
      setFormData={() => {}}
    />,
    { store, container: createRootContainer() }
  )
}

describe('EditingCardData component', () => {
  it('should exists', () => {
    expect(EditingCardData).toBeDefined()
  })
  it('should render Title', () => {
    setup(defaultStore)

    expect(screen.getByText(/alterar dados do cartão/i)).toBeDefined()
  })
  describe('Buttons tests', () => {
    it(`should trigger 'SALVAR ALTERAÇÕES' button`, () => {
      const handleClose = jest.fn()
      const setFormData = jest.fn()

      renderWithReduxAndTheme(
        <EditingCardData
          isOpen
          handleClose={handleClose}
          formData={formData}
          setFormData={setFormData}
        />,
        { container: createRootContainer() }
      )

      const saveButton = screen.getByRole('button', {
        name: /SALVAR ALTERAÇÕES/i,
      })
      userEvent.click(saveButton)

      expect(handleClose).toHaveBeenCalled()
      expect(setFormData).toHaveBeenCalled()
    })
    it(`should trigger 'close' button`, () => {
      const handleClose = jest.fn()

      renderWithReduxAndTheme(
        <EditingCardData
          isOpen
          handleClose={handleClose}
          formData={formData}
          setFormData={() => {}}
        />,
        {
          container: createRootContainer(),
        }
      )

      const closeButton = screen.getByText(/close/i)
      userEvent.click(closeButton)

      expect(handleClose).toHaveBeenCalled()
    })
  })
  it('should render flag select correctly', () => {
    setup(defaultStore)

    const flagInput = screen.getByTestId('select-option-input-data-bandeira')

    userEvent.click(flagInput)
    userEvent.click(screen.getByTestId('option-Mastercard'))
    expect(flagInput).toHaveValue('Mastercard')

    userEvent.click(flagInput)
    userEvent.click(screen.getByTestId('option-Visa'))
    expect(flagInput).toHaveValue('Visa')
  })
  it('should render due date select correctly', () => {
    setup(defaultStore)

    const dueDateInput = screen.getByTestId(
      'select-option-input-data-vencimento-fatura'
    )

    userEvent.click(dueDateInput)
    userEvent.click(screen.getByTestId('option-20'))
    expect(
      screen.getByTestId('select-option-input-data-vencimento-fatura')
    ).toHaveValue('20')
  })
  it('should render selects without formData', () => {
    renderWithReduxAndTheme(
      <EditingCardData
        isOpen
        handleClose={() => {}}
        formData={{}}
        setFormData={() => {}}
      />,
      {
        container: createRootContainer(),
      }
    )

    const flagInput = screen.getByTestId('select-option-input-data-bandeira')

    expect(flagInput).toHaveValue('Mastercard')

    const dueDateInput = screen.getByTestId(
      'select-option-input-data-vencimento-fatura'
    )
    expect(dueDateInput).toHaveValue('01')
  })
  it('should render modal', () => {
    window.resizeTo(400, 600)

    setup(defaultStore)

    expect(screen.getByText(/alterar dados do cartão/i)).toBeDefined()
  })
  it('should render loading state', () => {
    const storeData = {
      creditCardExpirationDays: {
        data: {},
        isLoading: true,
      },
    }

    const store = storeFactory(storeData)
    renderWithReduxAndTheme(
      <EditingCardData
        isOpen
        handleClose={() => {}}
        formData={formData}
        setFormData={() => {}}
      />,
      { store, container: createRootContainer() }
    )

    expect(screen.getByTestId(/loading-bar/i)).toBeDefined()
  })
})
