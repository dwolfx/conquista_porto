import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'
import InformationConfirmation from '.'

const texts = {
  title: 'Contratação',
  steps: {
    informationConfirmation: {
      title: 'Confirme seus dados',
      subtitle:
        'Precisamos confirmar algumas de suas informações para continuar.',
    },
  },
}

describe('InformationConfirmation component tests', () => {
  it('should exists', () => {
    expect(InformationConfirmation).toBeDefined()
  })

  it('should render correctly', () => {
    renderWithReduxAndTheme(<InformationConfirmation />)

    const title = screen.getByText(texts.title)
    const stepTitle = screen.getByText(
      texts.steps.informationConfirmation.title
    )
    const stepSubtitle = screen.getByText(
      texts.steps.informationConfirmation.subtitle
    )
    expect(title).toBeInTheDocument()
    expect(stepTitle).toBeInTheDocument()
    expect(stepSubtitle).toBeInTheDocument()
  })

  it('should is disabled button', () => {
    const { getByTestId } = renderWithReduxAndTheme(<InformationConfirmation />)

    const button = getByTestId('button-next-id')
    expect(button).toBeDisabled()
    expect(screen.getByText('Próximo')).toBeInTheDocument()
  })
})
