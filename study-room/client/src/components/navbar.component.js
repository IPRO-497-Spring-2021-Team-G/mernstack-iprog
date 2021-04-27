
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Reserve</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/view" className="nav-link">View Tables</Link>
          </li>          
          
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Tables</Link>
          </li>
          <li className="navbar-item">
          <Link to="/history" className="nav-link">history</Link>
          </li>

          <li className="navbar-item">
          <Link to="/login" className="nav-link">log in</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}