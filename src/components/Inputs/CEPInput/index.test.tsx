import React from 'react'
import { renderWithReduxAndTheme, fireEvent, screen } from 'testUtils'

import CEPInput from '.'

describe('CEPInput tests', () => {
  it('should exists', () => {
    expect(CEPInput).toBeDefined()
  })
  it('should input numbers and render it masked', () => {
    const onChangeMock = jest.fn()
    renderWithReduxAndTheme(
      <CEPInput 
        onChange={onChangeMock} 
        name="cep"
        label="cep"
      />)
    const cepInput = screen.getByTestId('cep')
    fireEvent.change(cepInput, { target: { value: '11533230' }})
    expect(cepInput).toHaveValue('11533-230')
  })
})