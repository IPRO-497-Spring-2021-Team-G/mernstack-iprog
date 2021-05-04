import React, { Component } from 'react';
import AppNavbar from "./components/navbar.component";

import { Container } from 'reactstrap';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

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
        <AppNavbar />
        <main className="App">
          <Container>
          <HomeScreen />
            <ReserveTable />
            <TableView />
            <CreateTable />
            <TablesList />
            <SpecificRoom />
          </Container>
        </main>
        <Footer />
      </Provider>
    );
  }
}

export default App;
