import React, { useEffect } from 'react';
import '../styles/app.css';
import Header from './Header.js';
import Home from './Home.js';
import Checkout from './Checkout.js';
import Login from './Login.js';
import Payment from './Payment.js';
import Orders from './Orders.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase.js';
import { useStateValue } from './StateProvider.js';

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once the component loads because empy brackets at the end
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, []);

  return (
    <Router>
      <div className="app">
        {/** Header */}
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Payment/>
          </Route>
          <Route path="/orders">
            <Header/>
            <Orders/>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
