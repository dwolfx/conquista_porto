import React from 'react'

import { ThemeProvider } from 'styled-components'
import 'jest-styled-components'
import { render } from 'testUtils'
import theme from 'styles/theme'

import MultiSelector from '.'
import { IOption } from './types'

describe('MultiSelector component', () => {
  const options: IOption[] = [
    { text: 'Brasil', id: 1, value: 'brasil' },
    { text: 'Alemanha', id: 2, value: 'alemanha' },
    { text: 'Itália', id: 3, value: 'italia' },
    { text: 'Estados Unidos', id: 4, value: 'estadosunidos' },
    { text: 'Espanha', id: 5, value: 'espanha' },
    { text: 'Inglaterra', id: 6, value: 'inglaterra' },
    { text: 'Paises Baixos', id: 7, value: 'paisesbaixos' },
  ]
  const inputLabel = 'Você irá para qual(is) país(es)'
  const mockedFunction = jest.fn()

  it('should be visible', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <MultiSelector
          options={options}
          inputLabel={inputLabel}
          onChange={val => val}
          selectedOptions={options}
          setSelectedOptions={mockedFunction}
        />
      </ThemeProvider>
    )
    expect(getByTestId('select')).toBeVisible()
  })
})
