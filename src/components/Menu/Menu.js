import React from 'react';
import {Nav, NavDropdown, Navbar,Dropdown,DropdownButton,ButtonToolbar} from 'reactstrap';
import "./Menu.css";
import Contact from "../Contact";
const LeaderBoard = React.lazy(() => import('../LeaderBoard'));
// const Contact = React.Lazy(()=>import('../Contact'));

class Menu extends React.Component {
    render() {
      return (
        <Navbar bg="light">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavDropdown title="Menu">
                <NavDropdown.Item href="#"><LeaderBoard /></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#"><Contact /></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#"><img  className="item" width="30px" alt="" height="30px" src={require("../Inventory/hacker4.png")} /></NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        // <ButtonToolbar>
        //   {['up'].map(direction => (
        //     <DropdownButton
        //       drop={direction}
        //       variant="secondary"
        //       title={` Drop ${direction} `}
        //       id={`dropdown-button-drop-${direction}`}
        //       key={direction}
        //     >
        //       <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        //       <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        //       <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        //       <Dropdown.Divider />
        //       <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
        //     </DropdownButton>
        //   ))}
        // </ButtonToolbar>
        );
    }
  }

  export default Menu;