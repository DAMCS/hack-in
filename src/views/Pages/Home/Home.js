import React, { Component } from 'react';
import { Nav, NavbarBrand, NavLink, NavItem, Navbar } from 'reactstrap';
export default class Home extends Component {
  render() {
    return (
      <React.Fragment >
        <header class="">
          <Navbar color="dark" dark expand="md" className="mx-auto my-auto">
            <NavbarBrand className="d-flex">
              <NavLink href="/">
                Hack[in]
              </NavLink>
            </NavbarBrand>
            <Nav className="mx-auto" navbar>
              <NavItem className="p-2">
                <NavLink href="/#/login">
                  Login
                  </NavLink>
              </NavItem>
              <NavItem className="p-2">
                <NavLink href="/#/signup">
                  Sign Up
                  </NavLink>
              </NavItem>
              <NavItem className="p-2">
                <NavLink href="/#/dashboard">
                  About
                  </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </header>
      </React.Fragment>
    )
  }
}