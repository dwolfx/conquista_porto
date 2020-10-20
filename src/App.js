import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { HashRouter, useLocation } from 'react-router-dom'
import AppProviders from 'AppProviders'
import 'moment/locale/pt-br'
import injectExternalScripts from 'ExternalScripts/injectExternalScripts'
import smoothscroll from 'smoothscroll-polyfill'

import GlobalStyle from './styles/global'
import Routes from './routes'

function ScrollToTopOnMount() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

injectExternalScripts()

smoothscroll.polyfill()

const App = () => (
  <>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap"
        as="font"
      />
    </Helmet>

    <AppProviders>
      <HashRouter>
        <ScrollToTopOnMount />
        <GlobalStyle />
        <Routes />
      </HashRouter>
    </AppProviders>
  </>
)

export default App
