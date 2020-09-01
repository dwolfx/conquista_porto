import React from 'react'
import { act } from 'react-dom/test-utils'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import theme from 'styles/theme'

import ErrorCard from 'pages/Investments/FinancialApplication/EndOfApplicationFlow/ErrorCard'

const INITIAL_STATE = {}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

const waitForComponentToPaint = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
}

describe('Investments/FinancialApplication/EndOfApplicationFlow/ErrorCard', () => {
  it('Renders correctly', () => {
    const wrapper = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <ErrorCard />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    waitForComponentToPaint()
    expect(wrapper).toMatchSnapshot()
  })
})
