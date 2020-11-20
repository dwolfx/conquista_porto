import React from 'react'
import { storeFactory } from 'setupTests'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import mock from 'store/modules/CreditCard/Occupation/mock.json'

import Step3 from '.'

describe('Credit Card Step 3', () => {
  it('should be defined', () => {
    expect(Step3).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(<Step3 formData={{}} onNextStep={() => {}} />)
    expect(
      screen.getByText('Agora confirme alguns dados do seu cadastro:')
    ).toBeInTheDocument()
    expect(screen.getByText('estado civil')).toBeInTheDocument()
    expect(screen.getByText('sexo')).toBeInTheDocument()
    expect(screen.getByText('ocupação')).toBeInTheDocument()
    expect(screen.getByText('cidade')).toBeInTheDocument()
    expect(screen.getByText('nome da mãe')).toBeInTheDocument()
  })
  it('should open select when clicked', () => {
    const store = storeFactory({
      creditCardOccupation: {
        isLoading: false,
        hasError: false,
        data: mock,
      },
    })
    renderWithReduxAndTheme(<Step3 formData={{}} onNextStep={() => {}} />, {
      store,
    })
    const civilStateSelect = screen.getByTestId('select-estado civil')
    const sexSelect = screen.getByTestId('select-sexo')
    const ocupationSelect = screen.getByTestId('select-ocupação')

    fireEvent.click(civilStateSelect)
    expect(screen.getByText('Casado')).toBeInTheDocument()
    fireEvent.click(sexSelect)
    expect(screen.getByText('Feminino')).toBeInTheDocument()
    fireEvent.click(ocupationSelect)
    expect(screen.getByText('medico')).toBeInTheDocument()
  })
  it('should civil-state select the proper option when clicked', () => {
    renderWithReduxAndTheme(<Step3 formData={{}} onNextStep={() => {}} />)
    const civilStateSelect = screen.getByTestId('select-estado civil')

    fireEvent.click(civilStateSelect)
    fireEvent.click(screen.getByTestId('option-Casado'))
    expect(screen.getByTestId('select-option-input-civil-state')).toHaveValue(
      'Casado'
    )

    fireEvent.click(civilStateSelect)
    fireEvent.click(screen.getByTestId('option-Solteiro'))
    expect(screen.getByTestId('select-option-input-civil-state')).toHaveValue(
      'Solteiro'
    )

    fireEvent.click(civilStateSelect)
    fireEvent.click(screen.getByTestId('option-Outros'))
    expect(screen.getByTestId('select-option-input-civil-state')).toHaveValue(
      'Outros'
    )

    fireEvent.click(civilStateSelect)
    fireEvent.click(screen.getByTestId('option-Viúvo'))
    expect(screen.getByTestId('select-option-input-civil-state')).toHaveValue(
      'Viúvo'
    )
  })

  it('should sex select the proper option when clicked', () => {
    renderWithReduxAndTheme(<Step3 formData={{}} onNextStep={() => {}} />)
    const sexSelect = screen.getByTestId('select-sexo')

    fireEvent.click(sexSelect)
    fireEvent.click(screen.getByTestId('option-Masculino'))
    expect(screen.getByTestId('select-option-input-sex')).toHaveValue(
      'Masculino'
    )

    fireEvent.click(sexSelect)
    fireEvent.click(screen.getByTestId('option-Feminino'))
    expect(screen.getByTestId('select-option-input-sex')).toHaveValue(
      'Feminino'
    )
  })
  it('should input work correctly', () => {
    renderWithReduxAndTheme(<Step3 formData={{}} onNextStep={() => {}} />)
    const cityInput = screen.getByTestId('cidade')
    fireEvent.change(cityInput, { target: { value: 'Londrina' } })
    expect(cityInput).toHaveValue('Londrina')

    const momNameInput = screen.getByTestId('nome da mãe')
    fireEvent.change(momNameInput, { target: { value: 'Carla' } })
    expect(momNameInput).toHaveValue('Carla')
  })
  it('should show next step when button is clicked', () => {
    const store = storeFactory({
      creditCardOccupation: {
        isLoading: false,
        hasError: false,
        data: mock,
      },
    })
    const changeStepFunction = jest.fn()
    renderWithReduxAndTheme(
      <Step3 formData={{}} onNextStep={changeStepFunction} />,
      { store }
    )
    const civilStateSelect = screen.getByTestId('select-estado civil')
    const sexSelect = screen.getByTestId('select-sexo')
    const ocupationSelect = screen.getByTestId('select-ocupação')
    const cityInput = screen.getByTestId('cidade')
    const momNameInput = screen.getByTestId('nome da mãe')

    fireEvent.click(civilStateSelect)
    fireEvent.click(screen.getByTestId('option-Casado'))

    fireEvent.click(sexSelect)
    fireEvent.click(screen.getByTestId('option-Masculino'))

    fireEvent.click(ocupationSelect)
    fireEvent.click(screen.getByTestId('option-medico'))

    fireEvent.change(cityInput, { target: { value: 'Londrina' } })
    fireEvent.change(momNameInput, { target: { value: 'Carla' } })

    fireEvent.click(screen.getByRole('button', { name: /próximo/i }))
    expect(changeStepFunction).toHaveBeenCalled()
  })
  it('should snow pre selected inputs', () => {
    renderWithReduxAndTheme(
      <Step3
        formData={{ nomeMae: 'Carla', cidade: 'Londrina' }}
        onNextStep={() => {}}
      />
    )
    const cityInput = screen.getByTestId('cidade')
    expect(cityInput).toHaveValue('Londrina')

    const momNameInput = screen.getByTestId('nome da mãe')
    expect(momNameInput).toHaveValue('Carla')
  })
})
