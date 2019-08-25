import React, { Component } from "react";
import { Row, Col, Jumbotron } from "react-bootstrap";

import { Redirect } from "react-router-dom";

import axios from "axios";
const Header = React.lazy(() => import("./Header"));
const Footer = React.lazy(() => import("./Footer"));

const ControlledTabs = React.lazy(() => import("./ControlledTabs"));

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		};
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
					this.setState({ isLoggedIn: true });
				}
			});
		}
	}

	render() {
		if (this.state.isLoggedIn === true) {
			return <Redirect to="/dashboard" />;
		} else {
			return (
				<React.Fragment>
					<Jumbotron
						fluid
						style={{ height: "calc(100vh)", marginBottom: "0px" }}
					>
						<Header />
						<Row>
							<Col md="4" />
							<Col md="4">
								<ControlledTabs />
							</Col>
							<Col md="4" />
						</Row>
						<Footer />
					</Jumbotron>
				</React.Fragment>
			);
		}
	}
}
