import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import store from './store'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import Routes from './routes'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)

export default App
