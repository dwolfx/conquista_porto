import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { storeFactory } from 'setupTests'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

function renderWithReduxAndTheme(
  ui: React.ReactElement,
  { store = storeFactory(), ...renderOptions } = {}
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
