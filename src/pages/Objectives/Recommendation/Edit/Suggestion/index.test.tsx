import React from 'react'
import { renderWithReduxAndTheme, screen, createRootContainer } from 'testUtils'
import { IRecommendations } from 'store/modules/Objective/types'

import Suggestions from './index'

const recommendationMock: IRecommendations = require('mocks/recommendation.json')

let isOpen = true

const handleClose = () => (isOpen = false)

describe('Objective Recommendation Edit Suggestions', () => {
  it('should render edit inputs', () => {
    renderWithReduxAndTheme(
      <Suggestions
        answer={recommendationMock.answer}
        formData={recommendationMock.answer}
        suggestionData={recommendationMock.suggestion_goal!}
        onClose={handleClose}
        setFormData={() => null}
      />,
      { container: createRootContainer() }
    )

    expect(screen.queryByDisplayValue('Viagem')).toBeDefined()
    expect(screen.queryByDisplayValue('11/07/2021')).toBeDefined()
    expect(screen.queryByDisplayValue('100.000,00')).toBeDefined()
    expect(screen.queryByDisplayValue('10.000,00')).toBeDefined()
    expect(
      screen.queryByRole('button', { name: 'Confirmar e recalcular' })
    ).toBeDefined()
  })

  it('should render monthly value recommendation', () => {
    renderWithReduxAndTheme(
      <Suggestions
        answer={recommendationMock.answer}
        formData={recommendationMock.answer}
        suggestionData={{
          suggestion_monthly_value: 10000,
          suggestion_target_date: '24/07/2021',
        }}
        onClose={handleClose}
        setFormData={() => null}
      />,
      { container: createRootContainer() }
    )

    expect(
      screen.queryAllByText(/check.svg/g)[0].parentElement
    ).toHaveTextContent('R$ 10.000,00check.svg')
    expect(screen.queryAllByText(/check.svg/g)[0].parentElement).toHaveStyle(
      'color: #46A166'
    )
  })
})
