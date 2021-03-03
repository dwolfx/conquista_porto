import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import { storeFactory } from 'setupTests'

import { ICreditCardExpirationDays } from 'store/modules/CreditCard/ExpirationDays/types'
import SummaryStep from '.'

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
    <SummaryStep
      formData={{}}
      setFormData={() => {}}
      onSubmit={() => {}}
      retrySubmit={false}
    />,
    { store, container: createRootContainer() }
  )
}

describe('SummaryStep tests', () => {
  it('should exist', () => {
    expect(SummaryStep).toBeDefined()
  })
  it('should render correctly', () => {
    setup(defaultStore)

    expect(screen.getByText('Resumo')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Antes de enviar a solicitação, por favor, revise as informações.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('DADOS PESSOAIS')).toBeInTheDocument()
    expect(screen.getByText('DADOS DO CARTÃO')).toBeInTheDocument()
    expect(screen.getByText('DADOS DE ENTREGA')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Concordo com a solicitação do Cartão de Crédito Porto Seguro e com as condições do contrato, que será enviado com o cartão.'
      )
    ).toBeInTheDocument()
  })
  it('checkbox should work properly', () => {
    setup(defaultStore)

    const checkbox = screen.getByTestId('credit-card-check')
    fireEvent.click(checkbox)
    expect(
      screen.getByRole('button', { name: 'SOLICITAR CARTÃO' })
    ).not.toBeDisabled()
  })
  it('should show next step', () => {
    const changeStepFunction = jest.fn()
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(
      <SummaryStep
        formData={{}}
        setFormData={() => {}}
        onSubmit={changeStepFunction}
        retrySubmit={false}
      />,
      { store, container: createRootContainer() }
    )
    const checkbox = screen.getByTestId('credit-card-check')
    fireEvent.click(checkbox)
    fireEvent.click(screen.getByRole('button', { name: 'SOLICITAR CARTÃO' }))
    expect(changeStepFunction).toHaveBeenCalled()
  })
})
