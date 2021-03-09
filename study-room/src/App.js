//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import TablesList from "./components/tables-list.component";
import CreateTable from "./components/create-table.component";
import ReserveTable from "./components/reserve.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={ReserveTable} />
      <Route path="/create" component={CreateTable} />
      <Route path="/history" component={TablesList} />
    </Router>
  );
}

export default App;
