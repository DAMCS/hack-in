import React from 'react';
import {Nav, NavDropdown, Navbar} from 'react-bootstrap';
import "./Menu.css";
const LeaderBoard = React.lazy(() => import('../LeaderBoard'));
class Menu extends React.Component {
    render() {
      return (
        <Navbar bg="light">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavDropdown title="Menu">
                <NavDropdown.Item href="#"><LeaderBoard /></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#"><img width="30px" alt="" height="30px" src={require("../Inventory/hacker2.png")} /></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#"><img width="30px" alt="" height="30px" src={require("../Inventory/hacker4.png")} /></NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>);
    }
  }

  export default Menu;