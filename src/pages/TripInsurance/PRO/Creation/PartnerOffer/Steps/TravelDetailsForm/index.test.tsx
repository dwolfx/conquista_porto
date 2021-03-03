import React from 'react'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import moment from 'moment'
import { MemoryRouter } from 'react-router-dom'
import CustomerDataForm from '.'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    container.setAttribute('role', 'main')
    document.body.appendChild(container)
  }
  return container
}

const setup = () => (
  <MemoryRouter
    initialEntries={[
      '/seguro-viagem/simular/pro/eyAiY3BmQ2xpZW50ZSI6IDMzMjQ0NDUyODA5LCAiaWRDb3JyZXRvciI6ICIzNSIsICJub21lQ2xpZW50ZSI6ICJSYXBoYWVsIFJvZHJpZ3VlcyJ9',
    ]}
  >
    <CustomerDataForm />
  </MemoryRouter>
)

describe('CustomerDataForm tests', () => {
  it('should exists', () => {
    expect(CustomerDataForm).toBeDefined()
  })
  it('should behave correctly the select input: ORIGEM', () => {
    renderWithReduxAndTheme(setup(), {
      container: createRootContainer(),
    })
    expect(screen.getByTestId('select-option-input-origem')).toHaveValue(
      'Brasil'
    )
  })
  it('should behave correctly the select input: DESTINO', () => {
    renderWithReduxAndTheme(setup(), {
      container: createRootContainer(),
    })
    fireEvent.click(screen.getByTestId('select-option-input-destino'))
    fireEvent.click(screen.getByTestId('option-Nacional'))
    expect(screen.getByTestId('select-option-input-destino')).toHaveValue(
      'Nacional'
    )
    fireEvent.click(screen.getByTestId('select-option-input-destino'))
    fireEvent.click(screen.getByTestId('option-Internacional'))
    expect(screen.getByTestId('select-option-input-destino')).toHaveValue(
      'Internacional'
    )
  })
  it('should behave correctly the select input: COMISSAO', () => {
    renderWithReduxAndTheme(setup(), {
      container: createRootContainer(),
    })
    fireEvent.click(screen.getByTestId('select-option-input-operacoes'))
    fireEvent.click(screen.getByTestId('option-15A'))
    expect(screen.getByTestId('select-option-input-operacoes')).toHaveValue(
      '15A'
    )
    fireEvent.click(screen.getByTestId('select-option-input-operacoes'))
    fireEvent.click(screen.getByTestId('option-20A'))
    expect(screen.getByTestId('select-option-input-operacoes')).toHaveValue(
      '20A'
    )
    fireEvent.click(screen.getByTestId('select-option-input-operacoes'))
    fireEvent.click(screen.getByTestId('option-25B'))
    expect(screen.getByTestId('select-option-input-operacoes')).toHaveValue(
      '25B'
    )
    fireEvent.click(screen.getByTestId('select-option-input-operacoes'))
    fireEvent.click(screen.getByTestId('option-30C'))
    expect(screen.getByTestId('select-option-input-operacoes')).toHaveValue(
      '30C'
    )
  })
  it('should behave correctly the radio input: PRATICAR ESPORTES', () => {
    renderWithReduxAndTheme(setup(), {
      container: createRootContainer(),
    })
    fireEvent.click(screen.getByTestId('input-radio-esportes-sim'))
    expect(screen.getByTestId('input-radio-esportes-nao')).not.toBeChecked()
    expect(screen.getByTestId('input-radio-esportes-sim')).toBeChecked()
  })
  it('should behave correctly the radio input: ANDAR MOTOCICLETA', () => {
    renderWithReduxAndTheme(setup(), {
      container: createRootContainer(),
    })
    fireEvent.click(screen.getByTestId('input-radio-motocicleta-sim'))
    expect(screen.getByTestId('input-radio-motocicleta-nao')).not.toBeChecked()
    expect(screen.getByTestId('input-radio-motocicleta-sim')).toBeChecked()
  })
  it('should show the datepicker and chose some date and apply', () => {
    renderWithReduxAndTheme(setup(), {
      container: createRootContainer(),
    })
    fireEvent.click(screen.getByRole('textbox', { name: 'Data de partida' }))
    expect(
      screen.getByRole('textbox', { name: 'Data de partida' })
    ).toHaveClass('DateInput_input DateInput_input_1')

    fireEvent.change(screen.getByRole('textbox', { name: 'Data de partida' }), {
      target: { value: moment().format('DD/MM/YYY') },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Data de chegada' }), {
      target: {
        value: moment()
          .add(1, 'year')
          .format('DD/MM/YYY'),
      },
    })
    expect(
      screen.getByRole('textbox', { name: 'Data de partida' })
    ).toHaveValue(moment().format('DD/MM/YYY'))
    expect(
      screen.getByRole('textbox', { name: 'Data de chegada' })
    ).toHaveValue(
      moment()
        .add(1, 'year')
        .format('DD/MM/YYY')
    )
  })
})
