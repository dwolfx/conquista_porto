import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import MainContent from '.'

describe('MainContent', () => {
  const mockNextStep = jest.fn()
  it(`should be able to display button with text 'Próximo'`, () => {
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }
    const container = portalRoot
    const { getByText } = renderWithReduxAndTheme(
      <MainContent
        step={1}
        setStep={mockNextStep}
        maxSteps={4}
        onError={() => null}
        setPrompt={() => null}
        setMessageStep={() => null}
      />,
      { container }
    )
    expect(getByText('Próximo')).toBeDefined()
  })
  it(`should be able to display button with text 'Voltar'`, () => {
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }
    const container = portalRoot
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
      { container }
    )
    expect(getByText('Voltar')).toBeDefined()
  })
})
