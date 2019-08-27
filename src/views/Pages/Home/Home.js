import React, { Component } from "react";
import { Row, Col, Jumbotron, Container } from "react-bootstrap";

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
				url: "/api/user",
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
					<Container fluid>
						<Row>
							<Col className="d-flex justify-content-center align-items-center">
								<Jumbotron fluid >
									<Header />
									<ControlledTabs />
								</Jumbotron>
							</Col>
						</Row>
					</Container>
				</React.Fragment >
			);
		}
	}
}
/*

style={{ boxShadow: "0 50vh 0 50vh #000", maxWidth: "100%", overflowX: "hidden" }}
*/