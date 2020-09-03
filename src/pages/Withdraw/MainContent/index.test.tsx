import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import { render } from '@testing-library/react'

import MainContent from '.'

describe('MainContent', () => {
  const mockNextStep = jest.fn()

  it(`should be able to display button with text 'Próximo'`, () => {
    const { getByText } = renderWithReduxAndTheme(
      <MainContent
        step={1}
        setStep={mockNextStep}
        maxSteps={4}
        onError={() => null}
        setPrompt={() => null}
        setMessageStep={() => null}
      />
    )
    expect(getByText('Próximo')).toBeDefined()
  })
  it(`should be able to display button with text 'Voltar'`, () => {
    const { getByText } = renderWithReduxAndTheme(
      <div>
        <MainContent
          step={2}
          setStep={mockNextStep}
          maxSteps={4}
          onError={() => null}
          setPrompt={() => null}
          setMessageStep={() => null}
        />
      </div>,
      { container: document.body }
    )
    expect(getByText('Voltar')).toBeDefined()
  })
})
