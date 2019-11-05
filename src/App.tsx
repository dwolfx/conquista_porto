import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
