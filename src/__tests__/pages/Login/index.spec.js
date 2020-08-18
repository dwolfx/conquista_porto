import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import Login from 'pages/Login'

const INITIAL_STATE = {
  auth: {},
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

describe('Login component', () => {
  /*
   * New window.location value setted to handle with:
   * "Error: Not implemented: navigation (except hash changes)""
   */
  delete window.location
  window.location = { ...window.location, href: '/' }

  it('should not render', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Login />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should renders correctly with development value for env', () => {
    process.env.REACT_APP_ENV = 'development'

    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Login />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should renders correctly with local value for env', () => {
    process.env.REACT_APP_ENV = 'local'

    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Login />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should renders correctly with error message', () => {
    process.env.REACT_APP_ENV = 'development'

    const INITIAL_STATE_WITH_ERROR = {
      auth: {
        error: 'error message',
      },
    }

    const tree = renderer
      .create(
        <Provider store={mockStore(INITIAL_STATE_WITH_ERROR)}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Login />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
