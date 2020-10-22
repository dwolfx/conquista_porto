import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import Step3 from '.'

describe('Credit Card Step 3', () => {
  it('should be defined', () => {
    expect(Step3).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(
      <Step3 changeStep={() => {}}/>
    )
    expect(screen.getByText('Agora confirme alguns dados do seu cadastro:')).toBeInTheDocument()
    expect(screen.getByText('estado civil')).toBeInTheDocument()
    expect(screen.getByText('sexo')).toBeInTheDocument()
    expect(screen.getByText('ocupação')).toBeInTheDocument()
    expect(screen.getByText('cidade')).toBeInTheDocument()
    expect(screen.getByText('nome da mãe')).toBeInTheDocument()
  })
  it('should open select when clicked', () => {
    renderWithReduxAndTheme(
      <Step3 changeStep={() => {}}/>
    )
    const civilStateSelect = screen.getByTestId('select-estado civil')
    const sexSelect = screen.getByTestId('select-sexo')
    const ocupationSelect = screen.getByTestId('select-ocupação')

    fireEvent.click(civilStateSelect)
    expect(screen.getByText('Casado')).toBeInTheDocument()
    fireEvent.click(sexSelect)
    expect(screen.getByText('Feminino')).toBeInTheDocument()
    fireEvent.click(ocupationSelect)
    expect(screen.getByText('Programador')).toBeInTheDocument()
  })
  it('should civil-state select the proper option when clicked', () => {
    renderWithReduxAndTheme(
      <Step3 changeStep={() => {}}/>
    )
    const civilStateSelect = screen.getByTestId('select-estado civil')

    fireEvent.click(civilStateSelect)
    fireEvent.click(screen.getByTestId('option-Casado'))
    expect(screen.getByTestId('select-option-input-civil-state')).toHaveValue('Casado')

    fireEvent.click(civilStateSelect)
    fireEvent.click(screen.getByTestId('option-Solteiro'))
    expect(screen.getByTestId('select-option-input-civil-state')).toHaveValue('Solteiro')

    fireEvent.click(civilStateSelect)
    fireEvent.click(screen.getByTestId('option-Divorciado'))
    expect(screen.getByTestId('select-option-input-civil-state')).toHaveValue('Divorciado')

    fireEvent.click(civilStateSelect)
    fireEvent.click(screen.getByTestId('option-Viúvo'))
    expect(screen.getByTestId('select-option-input-civil-state')).toHaveValue('Viúvo')
  })

  it('should sex select the proper option when clicked', () => {
    renderWithReduxAndTheme(
      <Step3 changeStep={() => {}}/>
    )
    const sexSelect = screen.getByTestId('select-sexo')

    fireEvent.click(sexSelect)
    fireEvent.click(screen.getByTestId('option-Masculino'))
    expect(screen.getByTestId('select-option-input-sex')).toHaveValue('Masculino')

    fireEvent.click(sexSelect)
    fireEvent.click(screen.getByTestId('option-Feminino'))
    expect(screen.getByTestId('select-option-input-sex')).toHaveValue('Feminino')
  })
  it('should ocupation select the proper option when clicked', () => {
    renderWithReduxAndTheme(
      <Step3 changeStep={() => {}}/>
    )
    const ocupationSelect = screen.getByTestId('select-ocupação')

    fireEvent.click(ocupationSelect)
    fireEvent.click(screen.getByTestId('option-Projetista'))
    expect(screen.getByTestId('select-option-input-ocupation')).toHaveValue('Projetista')

    fireEvent.click(ocupationSelect)
    fireEvent.click(screen.getByTestId('option-Arquiteto'))
    expect(screen.getByTestId('select-option-input-ocupation')).toHaveValue('Arquiteto')

    fireEvent.click(ocupationSelect)
    fireEvent.click(screen.getByTestId('option-Programador'))
    expect(screen.getByTestId('select-option-input-ocupation')).toHaveValue('Programador')

    fireEvent.click(ocupationSelect)
    fireEvent.click(screen.getByTestId('option-Designer'))
    expect(screen.getByTestId('select-option-input-ocupation')).toHaveValue('Designer')
  })
  it('should input work correctly', () => {
    renderWithReduxAndTheme(
      <Step3 changeStep={() => {}}/>
    )
    const cityInput = screen.getByTestId('cidade')
    fireEvent.change(cityInput, {target: { value: 'Londrina' }})
    expect(cityInput).toHaveValue('Londrina')

    const momNameInput = screen.getByTestId('nome da mãe')
    fireEvent.change(momNameInput, { target: { value: 'Carla' } })
    expect(momNameInput).toHaveValue('Carla')
  })
  it('should show loading when button is clicked', () => {
    const changeStepFunction = jest.fn()
    renderWithReduxAndTheme(
      <Step3 changeStep={changeStepFunction} />
    )
    fireEvent.click(screen.getByRole('button', { name: /próximo/i }))
    expect(changeStepFunction).toHaveBeenCalled()
  })
})
