import React, { useEffect } from 'react'
import { HashRouter, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GridThemeProvider } from 'styled-bootstrap-grid'
import 'moment/locale/pt-br'

import store from './store'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import Routes from './routes'

function ScrollToTopOnMount() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <GridThemeProvider gridTheme={theme.grid}>
          <ScrollToTopOnMount />
          <GlobalStyle />
          <Routes />
        </GridThemeProvider>
      </ThemeProvider>
    </HashRouter>
  </Provider>
)

export default App
