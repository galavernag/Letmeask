import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';

import { Login, NewRoom, Room, EmmbedLive } from './pages';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/rooms/create-room' component={NewRoom} />
          <Route path='/rooms/:id' component={Room} />
          <Route path='/embbed/:id' component={EmmbedLive} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
