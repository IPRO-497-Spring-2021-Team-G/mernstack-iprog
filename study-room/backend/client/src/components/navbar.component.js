
import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { ReactReduxContext } from 'react-redux';

class AppNavbar extends Component {
  state = {
    isOpen: false
  }
  
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
  
  toggle = () => {
    this.setState({
      // Close if open, open if closed
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome, ${user.name}` : '' } </strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
              <NavItem>
                <NavLink href="/">Reserve</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/view">View Tables</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create">Create Tables</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/history">History</NavLink>
              </NavItem>
              <NavItem>
                <RegisterModal />
              </NavItem>
              <NavItem>
                <LoginModal />
              </NavItem>
            </Fragment>
        );
        
        return (
        <div>
          <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
              <NavbarBrand href='/'>LBook</NavbarBrand>
              <NavbarToggler onClick={this.toggle}></NavbarToggler>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto">
                  { isAuthenticated ? authLinks : guestLinks }
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          </div>
          );
        }
      }

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);