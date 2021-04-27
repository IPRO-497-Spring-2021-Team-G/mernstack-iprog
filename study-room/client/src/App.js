import React, { Component } from 'react';
import Navbar from "./components/navbar.component";

import { Container } from 'reactstrap';

// Integrate store.js into application
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TablesList from "./components/tables-list.component";
import CreateTable from "./components/create-table.component";
import ReserveTable from "./components/reserve.component";
import TableView from "./components/tableView";
import SpecificRoom from "./components/specificRoom";

class App extends Component {
  // User will be loaded when the app loads
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      // Wrap everything in a Provider, share state throughout components
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Container>
            <ReserveTable />
            <TableView />
            <CreateTable />
            <TablesList />
            <SpecificRoom />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
