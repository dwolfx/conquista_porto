import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { storeFactory } from 'setupTests'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import { Store } from 'redux'

interface IOptions extends RenderOptions {
  store?: Store<any>
}

function renderWithReduxAndTheme(
  ui: React.ReactElement,
  { store = storeFactory(), ...renderOptions }: IOptions = {}
) {
  function Wrapper({ children }: { children: React.ComponentType }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    )
  }
  return rtlRender(ui, {
    wrapper: Wrapper as React.ComponentType,
    ...renderOptions,
  })
}

// re-export everything
export * from '@testing-library/react'

// override render method - render with redux
export { renderWithReduxAndTheme }
