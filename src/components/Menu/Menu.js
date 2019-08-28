import React from 'react';
import {DropdownToggle, DropdownMenu,DropdownItem,Dropdown} from 'reactstrap';
import "./Menu.css";
import Contact from "../Contact";
const LeaderBoard = React.lazy(() => import('../LeaderBoard'));
// const Contact = React.Lazy(()=>import('../Contact'));

class Menu extends React.Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: false
      };
    }

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    render() {
      return (
            <Dropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                Dropup
              </DropdownToggle>
              <DropdownMenu>
            <DropdownItem><LeaderBoard /></DropdownItem>
            <DropdownItem><Contact /></DropdownItem>
              </DropdownMenu>
            </Dropdown>
        );
    }
  }

  export default Menu;