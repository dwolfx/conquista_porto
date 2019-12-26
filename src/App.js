import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GridThemeProvider } from 'styled-bootstrap-grid'

import store from './store'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import Routes from './routes'

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <GridThemeProvider gridTheme={theme.grid}>
          <GlobalStyle />
          <Routes />
        </GridThemeProvider>
      </ThemeProvider>
    </HashRouter>
  </Provider>
)

export default App
