import React, { useEffect } from 'react'
import { HashRouter, useLocation } from 'react-router-dom'
import AppProviders from 'AppProviders'
import ToastContainer from 'components/Toast'
import 'moment/locale/pt-br'
import smoothscroll from 'smoothscroll-polyfill'

import TagManager from 'react-gtm-module'
import GlobalStyle from './styles/global'
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

smoothscroll.polyfill()

const App = () => (
  <AppProviders>
    <HashRouter>
      <ScrollToTopOnMount />
      <GlobalStyle />
      <Routes />
      <ToastContainer />
    </HashRouter>
  </AppProviders>
)

export default App
