import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import { TAdditional } from 'store/modules/ObjectiveManagement/types'
import CardCombine from './index'
import { fireEvent } from '@testing-library/react'

describe('Objective Manager CardCombine component', () => {
  it('should render component with credit card infos', () => {
    const additionalMock: TAdditional = {
      credit_card: true,
      life_security: false,
      travel_security: false,
    }

    renderWithReduxAndTheme(
      <CardCombine additional={additionalMock} onClick={path => null} />
    )

    expect(screen.queryByText('Seguro Viagem')).toBeNull()
    expect(screen.queryByText('Seguro de Vida')).toBeNull()
    expect(screen.queryByText('Cartão de Crédito')).toBeDefined()
  })

  it('should render component with life security infos', () => {
    const additionalMock: TAdditional = {
      credit_card: false,
      life_security: true,
      travel_security: false,
    }

    renderWithReduxAndTheme(
      <CardCombine additional={additionalMock} onClick={path => null} />
    )

    expect(screen.queryByText('Seguro Viagem')).toBeNull()
    expect(screen.queryByText('Cartão de Crédito')).toBeNull()
    expect(screen.queryByText('Seguro de Vida')).toBeDefined()
  })

  it('should render component with travel security infos', () => {
    const additionalMock: TAdditional = {
      credit_card: false,
      life_security: false,
      travel_security: true,
    }

    renderWithReduxAndTheme(
      <CardCombine additional={additionalMock} onClick={path => null} />
    )

    expect(screen.queryByText('Cartão de Crédito')).toBeNull()
    expect(screen.queryByText('Seguro de Vida')).toBeNull()
    expect(screen.queryByText('Seguro Viagem')).toBeDefined()
  })

  it('should call action when button is clicked', () => {
    const buttonAction = jest.fn()
    const additionalMock: TAdditional = {
      credit_card: false,
      life_security: false,
      travel_security: true,
    }

    renderWithReduxAndTheme(
      <CardCombine additional={additionalMock} onClick={buttonAction} />
    )

    expect(screen.queryByText('Cartão de Crédito')).toBeNull()
    expect(screen.queryByText('Seguro de Vida')).toBeNull()
    expect(screen.queryByText('Seguro Viagem')).toBeDefined()
    fireEvent.click(screen.getByRole('button', { name: 'Conheça' }))
    expect(buttonAction).toBeCalled()
  })
})
