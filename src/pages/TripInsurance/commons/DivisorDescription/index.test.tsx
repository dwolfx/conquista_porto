import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render } from 'testUtils'
import theme from 'styles/theme'

import DivisorDescription from '.'

describe('DivisorDescription component', () => {
  it('should exists', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DivisorDescription text="test" title="teste" />
      </ThemeProvider>
    )
    expect(getByText('test')).toBeVisible()
  })
})
