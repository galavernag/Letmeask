import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';

import { Login, NewRoom, Room, EmbbedLive, AdminRoom } from './pages';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/rooms/create-room' component={NewRoom} />
          <Route path='/rooms/:id' component={Room} />
          <Route path='/embbed/:id' component={EmbbedLive} />
          <Route path='/admin/rooms/:id' component={AdminRoom} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
