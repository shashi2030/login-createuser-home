import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '../Login/Login';
import Register from '../Register/Register';
import Home from '../Home/Home';
import AuthRoute from '../../presentation/AuthRoute/AuthRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/home" exact component={Home} />
          <AuthRoute path="/home" >
              <Home />
            </AuthRoute>
        </Switch>
      </Router>
    )
  }
}

export default App;
