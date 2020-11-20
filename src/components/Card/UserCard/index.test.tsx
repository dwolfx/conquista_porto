import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render } from 'testUtils'
import theme from 'styles/theme'

import UserCard from '.'

describe('UserCard component', () => {
  it('should be exists', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <UserCard name="Fulado DeTal" role="CEO" />
      </ThemeProvider>
    )
    expect(getByTestId('userCard')).toBeVisible()
  })

  it('should be text in content', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <UserCard name="Fulano DeTal" role="CEO" />
      </ThemeProvider>
    )

    expect(getByText('Fulano DeTal')).toBeVisible()
    expect(getByText('CEO')).toBeVisible()
  })

  describe('should be check if thumbnail', () => {
    it('exist', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <UserCard name="Fulano DeTal" role="CEO" />
        </ThemeProvider>
      )

      expect(getByTestId('userCardThumbnail')).toBeVisible()
    })

    it('not exist', () => {
      expect(() => {
        const { getByTestId } = render(
          <ThemeProvider theme={theme}>
            <UserCard name="Fulano DeTal" role="CEO" thumbnail={false} />
          </ThemeProvider>
        )
        getByTestId('userCardThumbnail')
      }).toThrowError()
    })
  })

  describe('should be return initial name letters', () => {
    it('when name has lastname', () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <UserCard name="Fulano DeTal" role="CEO" />
        </ThemeProvider>
      )

      expect(getByText('FD')).toBeVisible()
    })

    it('when name has only firstname', () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <UserCard name="Fulano" role="CEO" />
        </ThemeProvider>
      )

      expect(getByText('FU')).toBeVisible()
    })
    it('when name has only firtname letter', () => {
      const { getAllByText } = render(
        <ThemeProvider theme={theme}>
          <UserCard name="F" role="CEO" />
        </ThemeProvider>
      )
      expect(getAllByText('F')).toHaveLength(2)
    })
  })
})
