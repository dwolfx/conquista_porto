import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'

import BGImage from 'assets/images/pages/Objectives/GoalStreams/card-aposentar.jpg'
import CardWithBGImage from './index'

describe('Card with BackgroundImage component', () => {
  it('should render card with background and title props', () => {
    renderWithReduxAndTheme(
      <CardWithBGImage background={BGImage} title="Título do card" />
    )

    expect(screen.getByText('Título do card')).toBeDefined()
    expect(screen.getByTestId('background-image')).toHaveStyleRule(
      'background-image',
      `url('${BGImage}')`
    )
  })

  it('should render card with icon', () => {
    renderWithReduxAndTheme(
      <CardWithBGImage
        background={BGImage}
        title="Título do card"
        icon="plane"
      />
    )

    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('should render card with loading', () => {
    renderWithReduxAndTheme(
      <CardWithBGImage background={BGImage} title="Título do card" isLoading />
    )

    expect(screen.getByTestId('loading')).toBeDefined()
  })
})
