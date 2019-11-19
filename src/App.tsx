import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux';

import store from './store';
import GlobalStyle from './styles/global'
import history from './services/history'
import Routes from './routes'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <main className="main-content">
          <Routes />
        </main>
      </Router>
    </Provider>
  )
}

export default App
