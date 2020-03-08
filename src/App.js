import React, { useEffect } from 'react'
import { HashRouter, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GridThemeProvider } from 'styled-bootstrap-grid'
import 'moment/locale/pt-br'

import TagManager from 'react-gtm-module'
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

const tagManagerArgs = {
  gtmId: 'GTM-M4L9HVF',
}

TagManager.initialize(tagManagerArgs)

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <GridThemeProvider gridTheme={theme.grid}>
          <ScrollToTopOnMount />
          <GlobalStyle />
          <Routes />
          <ToastContainer autoClose={3000} draggable={false} />
        </GridThemeProvider>
      </ThemeProvider>
    </HashRouter>
  </Provider>
)

export default App
