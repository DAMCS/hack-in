import React, { Component } from 'react';
import {Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import Anouncement from '../../components/Announcement/Announcement'

import { Redirect } from "react-router-dom";
const Inventory = React.lazy(()=>import('../../components/Inventory/Inventory'));
const Header = React.lazy(() => import('./Header'));
const Footer = React.lazy(() => import('./Footer'));
const Menu = React.lazy(()=>import('../../components/Menu/Menu'));

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
    this.state.setState({isLoggedIn : false});
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
    if (this.state.isLoggedIn === false) {
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