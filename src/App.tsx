import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './containers/Login';
import Home from './containers/Home';
import { Header } from './components/header';
import Register from './containers/Register';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
