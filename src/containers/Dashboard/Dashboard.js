import React, { Component } from 'react';
import { Col, Row, Button,Container, Jumbotron  } from 'react-bootstrap';
import axios from 'axios';
import Anouncement from '../../components/Announcement/Announcement'

import { Redirect } from "react-router-dom";
import Footer from './Footer';

const Inventory = React.lazy(()=>import('../../components/Inventory/Inventory'));


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
    this.setState({isLoggedIn : false});
    this.props.history.push('/')
  }

	componentWillMount() {
		let token = localStorage.getItem("token");
		if (token) {
			axios({
				method: "get",
				url: "/api/user",
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
    if (this.state.isLoggedIn === false) {
			return (<Redirect to="/" />)
		} else {
    return (
      <React.Fragment>
        {/* <Jumbotron fluid style={{overflowX:"hidden"}}> */}
        <div class="animated fadeIn" >
          <Row>
            <Col md="2">
              <Anouncement />
              
            </Col>
            <Col md="9">
              
            </Col>
            <Col md="1">
              <Button style={{background:"black"}} onClick={this.handleLogout}><img width="30px" alt="Signout" height="30px" src={require("../Dashboard/signout.png")} /></Button>
              <Inventory />
             
            </Col>
            
          </Row>
          <Row>
            <Col md="11">
            </Col>
            <Col md="1">
              <Footer />
            </Col>
          </Row>
        </div>
        {/* </Jumbotron> */}
      </React.Fragment>
    )
    }
  }
}