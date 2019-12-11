import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GridThemeProvider } from 'styled-bootstrap-grid'

import store from './store'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import Routes from './routes'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GridThemeProvider gridTheme={theme.grid}>
          <GlobalStyle />
          <Routes />
        </GridThemeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)

export default App
