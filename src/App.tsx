import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
      <div className="App">
      </div>
    </BrowserRouter>
  );
}

export default App;
