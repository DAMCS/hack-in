import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import axios from 'axios';
import Anouncement from '../../components/Announcement/Announcement'

import { Redirect } from "react-router-dom";

// const Menu = React.lazy(() => import('../../components/Menu/Menu'));

const Inventory = React.lazy(() => import('../..//components/Inventory/Inventory'));
const LeaderBoard = React.lazy(() => import('../../components/LeaderBoard'));
const Contact = React.lazy(() => import('../../components/Contact'));

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
		this.setState({ isLoggedIn: false });
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
					this.setState({ isLoggedIn: true })
				}
			}).catch(error => {
				this.setState({ isLoggedIn: false })
			})
		}
		else {
			this.setState({ isLoggedIn: false })
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
							<Col md="1">
								<Anouncement />
							</Col>
							<Col md="10">
							</Col>
							<Col md="1">
								<Button style={{ background: "black" }} onClick={this.handleLogout}><img width="30px" alt="Signout" height="30px" src={require("../Dashboard/signout.png")} /></Button>
								<Inventory />
								<LeaderBoard />
								<Contact />
							</Col>
						</Row>
						{/* <Row>
            <Col md="11">
            </Col>
            <Col md="1">
              <Menu />
            </Col>
          </Row> */}
					</div>
					{/* </Jumbotron> */}
				</React.Fragment>
			)
		}
	}
}