import React, { Component } from 'react';
import {Accordion,Card,ListGroupItem,Badge,Col,Row,Nav,NavDropdown,Navbar} from 'react-bootstrap';
import axios from 'axios';
import Inventory from '../../components/Inventory/Inventory';


function Anouncement(){
  axios({
    method:'get',
    url:'http://13.235.77.118:3000/announcement',
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkNWU5NjM2Njg4ZjZmMDZiMzUyOGQ5ZCIsImlhdCI6MTU2NjQ4MDAwOCwiZXhwIjoxNTY2NDgzNjA4fQ.U6TkCk3AvvVaX8RnhsBzrmZwucoMzR-WBLuMi9RtSJ4",
    }
  }).then(response => {
    console.log(response.data)
  })
    .catch(function (error) {
      console.log(error.response.data);
    })
  return(
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

class Menu extends React.Component{
  render(){
      return (
        <Navbar bg="light">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavDropdown title="Menu">
                <NavDropdown.Item href="#"><img width="30px" alt="" height="30px" src="" /></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#"><img width="30px" alt="" height="30px" src="" /></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#"><img width="30px" alt="" height="30px" src="" /></NavDropdown.Item>  
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>);
    }
}
export default class LevelOne extends Component {
  render() {
    return (
      <React.Fragment >
        <div className=" animated fadeIn">
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
        </div>
      </React.Fragment>
    )
  }
}