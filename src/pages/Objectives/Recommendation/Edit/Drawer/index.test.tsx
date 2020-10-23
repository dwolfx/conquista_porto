import React from 'react'
import { renderWithReduxAndTheme, screen, createRootContainer } from 'testUtils'
import { IRecommendations } from 'store/modules/Objective/types'

import EditDrawer from './index'

const recommendationMock: IRecommendations = require('mocks/recommendation.json')

let isOpen = true

const handleClose = () => (isOpen = false)

describe('Objectives Recommendation Edit Drawer', () => {
  it('should render component', () => {
    renderWithReduxAndTheme(
      <EditDrawer
        isDrawerOpen
        formData={recommendationMock.answer}
        setFormData={() => null}
        onClose={handleClose}
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
})
