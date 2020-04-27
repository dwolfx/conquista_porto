import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GridThemeProvider } from 'styled-bootstrap-grid'

import store from 'store'
import theme from 'styles/theme'
import { ToastProvider } from 'hooks/toast'

const AppProviders = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GridThemeProvider gridTheme={theme.grid}>
        <ToastProvider>{children}</ToastProvider>
      </GridThemeProvider>
    </ThemeProvider>
  </Provider>
)

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppProviders
