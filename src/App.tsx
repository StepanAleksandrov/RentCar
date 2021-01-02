import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cars from './pages/Cars';
import Home from './pages/Home';
import CarRent from './pages/CarRent';
import Contact from './pages/Contact';
import Thanks from './pages/ThankYou';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route
          exact
          path='/cars/:city'
          render={(props) => <Cars params={props} />}
        ></Route>
        <Route
          path='/rent'
          render={(props) => <CarRent params={props} />}
        ></Route>
        <Route path='/contact' component={Contact}></Route>
        <Route path='/thanks' component={Thanks}></Route>
      </Switch>
    </div>
  );
}

export default App;
