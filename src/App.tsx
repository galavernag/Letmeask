import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';

import { Login, NewRoom } from './pages';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path='/' component={Login} />
        <Route path='/create-room' component={NewRoom} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
