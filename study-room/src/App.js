//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import Navbar from "./components/navbar.component"
import TablesList from "./components/tables-list.component";
import CreateTable from "./components/create-table.component";
import ReserveTable from "./components/reserve.component";
import TableView from "./components/tableView";
import SpecificRoom from "./components/specificRoom";


import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
function App() {
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={ReserveTable} />
      <Route path="/view" exact component={TableView} />
     
      <Switch>
              <PrivateRoute exact path="/create" component={CreateTable} />
            </Switch>
      <Switch>
              <PrivateRoute exact path="/history" component={TablesList} />
            </Switch>
      <Route path="/reserve" component={SpecificRoom} />
      <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
    </Router>
    </Provider>
  );
}

export default App;
