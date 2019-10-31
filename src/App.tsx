import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
      </div>
      <Routes />
    </Router>
  );
}

export default App;
