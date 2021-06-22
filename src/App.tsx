import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'

import { Login, NewRoom } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Login} />
      <Route path='/create-room' component={NewRoom} />
    </BrowserRouter>
  );
}

export default App;
