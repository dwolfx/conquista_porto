import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render } from 'testUtils'
import theme from 'styles/theme'
import { JustifyContent } from './types'

import BottomNavigationBar from '.'

describe('BottomNavigationBar component', () => {
  it('should be exists', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <BottomNavigationBar justifyContent={JustifyContent.END}>
          I'm a content
        </BottomNavigationBar>
      </ThemeProvider>
    )
    expect(getByTestId('bottomNavigationBar')).toBeVisible()
  })

  it('should have content when pass a children', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <BottomNavigationBar justifyContent={JustifyContent.END}>
          Bottom content
        </BottomNavigationBar>
      </ThemeProvider>
    )
    expect(getByText('Bottom content')).toBeVisible()
  })
})
