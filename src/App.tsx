import React from 'react'
import { Router } from 'react-router-dom'

import GlobalStyle from './styles/global'
import Routes from './routes'
import Footer from './components/Footer'
import Header from './components/Header'
import history from './services/history'

const App: React.FC = () => {
  return (
    <Router history={history}>
      <GlobalStyle />
      <Header />
      <main className="main-content">
        <Routes />
      </main>
      <Footer />
    </Router>
  )
}

export default App
