import React from 'react'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import moment from 'moment'
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

describe('CustomerDataForm tests', () => {
  it('should exists', () => {
    expect(CustomerDataForm).toBeDefined()
  })
  it('should behave correctly the select input: ORIGEM', () => {
    renderWithReduxAndTheme(<CustomerDataForm />, {
      container: createRootContainer(),
    })
    fireEvent.click(screen.getByTestId('select-option-input-origem'))
    fireEvent.click(screen.getByTestId('option-Brasil'))
    expect(screen.getByTestId('select-option-input-origem')).toHaveValue(
      'Brasil'
    )
    fireEvent.click(screen.getByTestId('select-option-input-origem'))
    fireEvent.click(screen.getByTestId('option-Estados-Unidos'))
    expect(screen.getByTestId('select-option-input-origem')).toHaveValue(
      'Estados Unidos'
    )
  })
  it('should behave correctly the select input: DESTINO', () => {
    renderWithReduxAndTheme(<CustomerDataForm />, {
      container: createRootContainer(),
    })
    fireEvent.click(screen.getByTestId('select-option-input-destino'))
    fireEvent.click(screen.getByTestId('option-Estados-Unidos'))
    expect(screen.getByTestId('select-option-input-destino')).toHaveValue(
      'Estados Unidos'
    )
    fireEvent.click(screen.getByTestId('select-option-input-destino'))
    fireEvent.click(screen.getByTestId('option-Brasil'))
    expect(screen.getByTestId('select-option-input-destino')).toHaveValue(
      'Brasil'
    )
  })
  it('should behave correctly the select input: COMISSAO', () => {
    renderWithReduxAndTheme(<CustomerDataForm />, {
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
    renderWithReduxAndTheme(<CustomerDataForm />, {
      container: createRootContainer(),
    })
    expect(screen.getByTestId('input-radio-esportes-nao')).toBeChecked()
    expect(screen.getByTestId('input-radio-esportes-sim')).not.toBeChecked()
    fireEvent.click(screen.getByTestId('input-radio-esportes-sim'))
    expect(screen.getByTestId('input-radio-esportes-nao')).not.toBeChecked()
    expect(screen.getByTestId('input-radio-esportes-sim')).toBeChecked()
  })
  it('should behave correctly the radio input: ANDAR MOTOCICLETA', () => {
    renderWithReduxAndTheme(<CustomerDataForm />, {
      container: createRootContainer(),
    })
    expect(screen.getByTestId('input-radio-motocicleta-nao')).toBeChecked()
    expect(screen.getByTestId('input-radio-motocicleta-sim')).not.toBeChecked()
    fireEvent.click(screen.getByTestId('input-radio-motocicleta-sim'))
    expect(screen.getByTestId('input-radio-motocicleta-nao')).not.toBeChecked()
    expect(screen.getByTestId('input-radio-motocicleta-sim')).toBeChecked()
  })
  it('should show the datepicker and chose some date and apply', () => {
    renderWithReduxAndTheme(<CustomerDataForm />, {
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
