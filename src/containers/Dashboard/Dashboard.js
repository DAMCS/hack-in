import React, { Component } from 'react';
import { Accordion, Card, ListGroupItem, Badge, Col, Row, Nav, NavDropdown, Navbar, Button } from 'react-bootstrap';
import axios from 'axios';

import { Redirect } from "react-router-dom";
const Inventory = React.lazy(()=>import('../../components/Inventory/Inventory'));
const Header = React.lazy(() => import('./Header'));
const Footer = React.lazy(() => import('./Footer'));

function Anouncement() {
  return (
    <Accordion className="list-group">
      <Card>
        <Card.Header>
          <Accordion.Toggle className="list-group-item" as={ListGroupItem} variant="link" eventKey="0">
            Anouncements<Badge className="badge" variant="light">2</Badge>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Anouncements comes here</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

class Menu extends React.Component {
  render() {
    return (
      <Navbar bg="light">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title="Menu">
              <NavDropdown.Item href="#action/3.1"><img width="30px" height="30px" src="" /></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2"><img width="30px" height="30px" src="" /></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3"><img width="30px" height="30px" src="" /></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>);
  }
}

export default class Dashboard extends Component {
  constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: true
    }
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout() {
    localStorage.removeItem('token');
    this.state.isLoggedIn = false;
    this.props.history.push('/')
  }

	componentWillMount() {
		let token = localStorage.getItem("token");
		if (token) {
			axios({
				method: "get",
				url: "/user",
				headers: {
					Authorization: "Bearer " + token
				}
			}).then(response => {
				if (response.data.status === "Success") {
					console.log(response.data);
					this.setState({isLoggedIn: true})
				}
			}).catch(error => {
        this.setState({isLoggedIn: false})
      })
    }
    else {
      this.setState({isLoggedIn: false})
    }
  }
  
  render() {
    if (this.state.isLoggedIn == false) {
			return (<Redirect to="/" />)
		} else {
    return (
      <React.Fragment>
        <div class="animated fadeIn">
          <Header />
          <Row>
            <Col md="2">
              <Anouncement />
            </Col>
            <Col md="9">

            </Col>
            <Col md="1">
              <Inventory />
              <Menu />
            </Col>
          </Row>
          <Footer />
          <Button variant="danger" onClick={this.handleLogout}>signout</Button>
        </div>
      </React.Fragment>
    )
    }
  }
}