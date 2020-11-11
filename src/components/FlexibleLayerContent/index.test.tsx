import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render } from 'testUtils'
import theme from 'styles/theme'

import FlexibleLayerContent from '.'

describe('FlexibleLayerContent component', () => {
  it('should be exists', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <FlexibleLayerContent>I'm a content</FlexibleLayerContent>
      </ThemeProvider>
    )
    expect(getByTestId('flexibleLayerContent')).toBeVisible()
  })

  it('should have content when pass a children', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <FlexibleLayerContent>I'm a content</FlexibleLayerContent>
      </ThemeProvider>
    )
    expect(getByText("I'm a content")).toBeVisible()
  })

  describe('BottomNavigationBar should be', () => {
    it('hidden by default', () => {
      expect(() => {
        const { getByTestId } = render(
          <ThemeProvider theme={theme}>
            <FlexibleLayerContent>I'm a content</FlexibleLayerContent>
          </ThemeProvider>
        )
        getByTestId('flexibleLayerContentBottomNavigationBar')
      }).toThrowError()
    })

    it('visible when bottomNavigationContent is set', () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <FlexibleLayerContent bottomNavigationContent={<>Bottom content</>}>
            I'm a content
          </FlexibleLayerContent>
        </ThemeProvider>
      )
      expect(getByText('Bottom content')).toBeVisible()
    })
  })
})
