import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import { fireEvent, screen, act } from '@testing-library/react'

import Text from 'components/Text'
import CarouselCard from 'components/Card/CarouselCard'

const arrayContent = [
  <Text type="title" bold color="green5">
    First - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Text>,
  <Text type="title" bold color="magenta2">
    Second - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Text>,
]

describe('CarouselCard', () => {
  it('should render with no error', () => {
    renderWithReduxAndTheme(
      <CarouselCard
        headerIcon="persongroup"
        headerTitle="Title"
        arrayContent={arrayContent}
      />
    )
    expect(
      screen.getByText(
        'First - Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      )
    ).toBeDefined()
    expect(
      screen.getByText(
        'Second - Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      )
    ).toBeInTheDocument()
  })
  it('should trigger backwardButton onClick', async () => {
    renderWithReduxAndTheme(
      <CarouselCard
        headerIcon="persongroup"
        headerTitle="Title"
        arrayContent={arrayContent}
      />
    )

    await act(async () => {
      const backwardButton = screen.getAllByRole('button')[0]
      await fireEvent.click(backwardButton)
      expect(backwardButton).toBeInTheDocument()
    })
  })
  it('should trigger forwardButton onClick', async () => {
    renderWithReduxAndTheme(
      <CarouselCard
        headerIcon="persongroup"
        headerTitle="Title"
        arrayContent={arrayContent}
      />
    )

    await act(async () => {
      const forwardButton = screen.getAllByRole('button')[1]
      await fireEvent.click(forwardButton)
      expect(forwardButton).toBeInTheDocument()
    })
  })
})
